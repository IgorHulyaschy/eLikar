import { injectable } from 'inversify'
import { onCallbackQuery, onMessage, onText } from '@elikar/application'
import { BotContext } from '@elikar/bot-provider'

import { BotService } from './BotService'
import { CodeConfirmationError } from './errors'
import { StateKeys } from './constants'
import { NurseTelegramConnectCommand } from '@elikar/commands'
import { MessageClient } from '@elikar/message-client'
import { BotCBContext } from '@elikar/bot-provider/src/interfaces'
import { BotTemplatesGenerator } from './BotTemplatesGenerator'

@injectable()
export class BotController {
  constructor(
    private readonly service: BotService,
    private readonly messageClient: MessageClient,
    private readonly botTemplatesGenerator: BotTemplatesGenerator
  ) {}

  @onText(/\/start/)
  async onTelegramConnection(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, 'Write your email to connect with main account:')
  }

  // #TODO any chars emails
  @onText(/([A-Za-z])@([A-Za-z]).([A-Za-z])/)
  async onEmailReceived(ctx: BotContext): Promise<void> {
    await this.service.sendConfirmationLetter(ctx.msg.text!, String(ctx.msg.chat.id))
    ctx.sendMessage(
      ctx.msg.chat.id,
      'Check your confirmation code that your received on email and write it here'
    )
  }

  @onText(/([0-9]{6})/)
  async onCodeConfirmation(ctx: BotContext): Promise<void> {
    try {
      const dto = await this.service.confirmConnection(ctx.msg.text!, String(ctx.msg.chat.id))
      this.messageClient.emit(new NurseTelegramConnectCommand(dto))
      ctx.sendMessage(
        ctx.msg.chat.id,
        'Telegram connection is successful',
        this.botTemplatesGenerator.MAIN_MENU()
      )
    } catch (err) {
      if (err instanceof CodeConfirmationError) ctx.sendMessage(ctx.msg.chat.id, 'Wrong code')
    }
  }

  @onMessage('My account')
  async sayHello(ctx: BotContext): Promise<void> {
    const data = await this.service.getMe(String(ctx.msg.chat.id))
    ctx.sendMessage(
      ctx.msg.chat.id,
      this.botTemplatesGenerator.personalInfo(data),
      this.botTemplatesGenerator.MAIN_MENU()
    )
  }

  @onMessage('Get patients')
  async getPatients(ctx: BotContext): Promise<void> {
    const data = await this.service.getListOfPatients(
      {
        id: String(ctx.msg.chat.id),
        limit: 7,
        offset: 0
      },
      {
        forReport: false
      }
    )

    ctx.sendMessage(ctx.msg.chat.id, 'Список пацієнтів', data)
  }

  @onMessage('Generate report')
  async createReport(ctx: BotContext): Promise<void> {
    ctx.sendMessage(ctx.msg.chat.id, 'Виберіть місяць', this.botTemplatesGenerator.getMonth())
  }

  @onMessage('Add medicine to report')
  async onUseMedicine(ctx: BotContext): Promise<void> {
    const medicines = await this.service.getListOfMedicines(String(ctx.msg.chat.id))

    ctx.sendMessage(
      ctx.msg.chat.id,
      'Список ліків',
      this.botTemplatesGenerator.getListOfMedicines(medicines)
    )
  }

  @onCallbackQuery()
  async onCallBackQuery(ctx: BotCBContext): Promise<void> {
    const cbData = ctx.cb.data
    const [stateValue, json] = cbData!.split('@')
    if (!json) return
    const parsedData = typeof json === 'string' ? json : JSON.parse(json)

    switch (stateValue) {
      case StateKeys.LIST_OF_PATIENTS: {
        const isNext = Boolean(parsedData.limit && parsedData.offset)
        if (isNext) {
          const data = await this.service.getListOfPatients(
            {
              id: String(ctx.cb.message!.chat.id),
              limit: parsedData.limit + 7,
              offset: parsedData.limit
            },
            { forReport: false }
          )
          ctx.sendMessage(ctx.cb.message!.chat.id, 'Список пацієнтів', data)
          break
        }
        if (parsedData !== StateKeys.EMPTY_CALLBACK) {
          await this.service.createReport(
            { patientId: parsedData },
            String(ctx.cb.message!.chat.id)
          )
          ctx.sendMessage(ctx.cb.message!.chat.id, 'Звіт створено')
        }
        break
      }
      case StateKeys.LIST_OF_MEDICINES: {
        const data = await this.service.getListOfPatients(
          {
            id: String(ctx.cb.message!.chat.id),
            limit: 7,
            offset: 0
          },
          { forReport: true, medicineId: parsedData }
        )
        ctx.sendMessage(ctx.cb.message!.chat.id, 'Список пацієнтів', data)
        break
      }
      case StateKeys.REPORT: {
        await this.service.setReportState(parsedData, String(ctx.cb.message!.chat.id))
        ctx.sendMessage(
          ctx.cb.message!.chat.id,
          'Виберіть день',
          this.botTemplatesGenerator.getDay(parsedData)
        )
        break
      }
      case StateKeys.DAY: {
        const data = await this.service.generateReport(parsedData, String(ctx.cb.message!.chat.id))
        ctx.sendDocument(
          ctx.cb.message!.chat.id,
          data.buffer,
          {},
          { contentType: 'application/csv', filename: data.fileName }
        )
        break
      }
      default:
        break
    }
  }
}
