/* eslint-disable prettier/prettier */
import { PatientDto } from '@elikar/dto'
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
      'reply_markup': {
        'inline_keyboard': [
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
}
