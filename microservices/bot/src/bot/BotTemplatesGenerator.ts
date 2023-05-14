/* eslint-disable prettier/prettier */
import { MedicineDto, PatientDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { ReplyMarkUp } from './interfaces'
import { StateKeys } from './constants';

@injectable()
export class BotTemplatesGenerator {
  getListOfPatients(
    data: PatientDto.Patient[],
    { limit, offset }: { limit: number; offset: number },
    isForReport: boolean
  ): ReplyMarkUp {
    return {
      reply_markup: {
        inline_keyboard: [
          ...(data.map((p) => {
            return [
              {
                text: `${p.fname} ${p.lname}`,
                callback_data: `${isForReport ? `${StateKeys.LIST_OF_PATIENTS}@${p.id}` : 'emptyCallback'}`
              }
            ]
          })),
          [{ text: 'Next', callback_data: `LIST_OF_PATIENTS@${JSON.stringify({ limit, offset })}` }]
        ]
      }
    }
  }

  getListOfMedicines(data: MedicineDto.Medicine[]): ReplyMarkUp {
    return {
      reply_markup: {
        inline_keyboard: [
          ...(data.map((m) => {
            return [
              {
                text: `${m.name}`,
                callback_data: `${StateKeys.LIST_OF_MEDICINES}@${m.id}`
              }
            ]
          }))
        ]
      }
    }
  }

  MAIN_MENU(): any {
    return {
      reply_markup: {
        keyboard: [['My account', 'Get patients'], ['Add medicine to report'], ["Generate report"]]
      }
    }
  }

  getMonth(): ReplyMarkUp {
    return {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'January',
              callback_data: `${StateKeys.REPORT}@0`
            },
            {
              text: 'February',
              callback_data: `${StateKeys.REPORT}@1`
            },
            {
              text: 'March',
              callback_data: `${StateKeys.REPORT}@2`
            },
          ],
          [
            {
              text: 'April',
              callback_data: `${StateKeys.REPORT}@3`
            },
            {
              text: 'May',
              callback_data: `${StateKeys.REPORT}@4`
            },
            {
              text: 'June',
              callback_data: `${StateKeys.REPORT}@5`
            },
          ],
          [
            {
              text: 'July',
              callback_data: `${StateKeys.REPORT}@6`
            },
            {
              text: 'August',
              callback_data: `${StateKeys.REPORT}@7`
            },
            {
              text: 'September',
              callback_data: `${StateKeys.REPORT}@8`
            },
          ],
          [
            {
              text: 'October',
              callback_data: `${StateKeys.REPORT}@9`
            },
            {
              text: 'November',
              callback_data: `${StateKeys.REPORT}@10`
            },
            {
              text: 'December',
              callback_data: `${StateKeys.REPORT}@11`
            },
          ]
        ]
      }
    }
  }

  getDay(month: number): ReplyMarkUp {
    const now = new Date()
    const currentMonth = now.getMonth()

    const days = Number(currentMonth) === Number(month) ? now.getDate() : new Date(now.getFullYear(), month, 0).getDate()
    const markUp = { reply_markup: { inline_keyboard: [] as any[] } }

    for(let day = 1; day <= days; day++) {
      const length = markUp.reply_markup.inline_keyboard.length

      if(!length || markUp.reply_markup.inline_keyboard[length - 1].length > 5) {
        markUp.reply_markup.inline_keyboard.push([{
          text: String(day),
          callback_data: `${StateKeys.DAY}@${day}`
        }])
      }
      else {
        markUp.reply_markup.inline_keyboard[length - 1].push({
          text: String(day),
          callback_data: `${StateKeys.DAY}@${day}`
        })
      }
    }
    return markUp
  }
}
