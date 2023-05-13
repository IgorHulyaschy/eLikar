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
        keyboard: [['My account', 'Get patients'], ['Add medicine to report'], ["I'm robot"]]
      }
    }
  }
}
