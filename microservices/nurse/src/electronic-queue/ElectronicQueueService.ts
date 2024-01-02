import { ElectronicQueueDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { DAY } from './contsants'
import { ElectronicQueue } from './ElectronicQueue'
// import { ElectronicQueueMapper } from './ElectronicQueueMapper'
import { ElectronicQueueRepository } from './ElectronicQueueRepository'

@injectable()
export class ElectronicQueueService {
  constructor(
    // private readonly mapper: ElectronicQueueMapper,
    private readonly repository: ElectronicQueueRepository
  ) {}

  async create(dto: ElectronicQueueDto.CreateElectronicQueue): Promise<void> {
    const queue = ElectronicQueue.create(dto)
    await this.repository.save(queue)
  }

  async getFreeSlots({ hospitalId, nurseId }: { hospitalId: string; nurseId: string }): Promise<
    Record<
      string,
      Record<
        string,
        {
          id: string
          hospitalId: string
          nurseId: string
          patientId: string
          status: ElectronicQueueDto.Status
          dayOfMonth: Date
          bookedTime: string
        }
      >
    >
  > {
    const weekTime = this.getWeekTime()
    const bookedSlots = await this.repository.findFreeSlots({
      hospitalId,
      nurseId,
      timeFrom: new Date(weekTime).getTime()
    })
    const workHours: Record<string, any> = {
      '10': {},
      '11': {},
      '12': {},
      '14': {},
      '15': {},
      '16': {}
    }
    const groupedSlots = bookedSlots.reduce<
      Record<
        string,
        Record<
          string,
          {
            id: string
            hospitalId: string
            nurseId: string
            patientId: string
            status: ElectronicQueueDto.Status
            dayOfMonth: Date
            bookedTime: string
          }
        >
      >
    >(
      (acc, row) => {
        const day = new Date(row.dayOfMonth).getDay()
        acc[day][row.bookedTime] = row
        return acc
      },
      {
        [ElectronicQueueDto.Week.Monday]: workHours,
        [ElectronicQueueDto.Week.Tuesday]: workHours,
        [ElectronicQueueDto.Week.Wednesday]: workHours,
        [ElectronicQueueDto.Week.Thursday]: workHours,
        [ElectronicQueueDto.Week.Friday]: workHours
      }
    )
    return groupedSlots
    // const slots = {
    //   1: [...freeSlots.filter((row) => row.dayOfWeek === 1)],
    //   2: {
    //     13: null,
    //     14: null,
    //     15: null,
    //     16: null,
    //     17: null
    //   },
    //   3: [...freeSlots.filter((row) => row.dayOfWeek === 1)],
    //   4: [...freeSlots.filter((row) => row.dayOfWeek === 1)],
    //   5: [...freeSlots.filter((row) => row.dayOfWeek === 1)]
    // }
    // return freeSlots
  }

  getWeekTime(): Date {
    let time: number
    const dayOfWeek = new Date().getDay()
    if (dayOfWeek === ElectronicQueueDto.Week.Saturday) {
      // return monday of next week
      time = new Date(Date.now() + DAY * 2).setHours(0, 0, 0, 0)
    } else if (dayOfWeek === ElectronicQueueDto.Week.Sunday) {
      // return monday of next week
      time = new Date(Date.now() + DAY).setHours(0, 0, 0, 0)
    } else {
      // return current monday of week
      time = new Date(Date.now() - DAY * (dayOfWeek - 1)).setHours(0, 0, 0, 0)
    }
    return new Date(time)
  }
}
