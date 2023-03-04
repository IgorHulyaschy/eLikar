import { inject, injectable } from 'inversify'
import TelegramBot from 'node-telegram-bot-api'
import { Logger } from '@elikar/logger'
import { Class } from 'type-fest'

import { TYPES } from './constants'
import { Options } from './interfaces'

@injectable()
export class BotProvider extends TelegramBot {
  constructor(@inject(TYPES.Options) { token }: Options, private readonly logger: Logger) {
    super(token, { polling: true })
  }

  async buildOnTextHandlers(
    onTextMetadata: Array<{ regExp: RegExp; methodName: string }>,
    controller: any
  ): Promise<void> {
    onTextMetadata.forEach((metadata) => {
      this.onText(metadata.regExp, async (msg) => {
        if (!msg) return this.logger.error('Catch request but has no message')
        this.logger.info(`Catch request from ${msg.chat.id}:${msg.chat.username}`)

        const that = this as any
        that.msg = msg
        await controller[metadata.methodName as keyof typeof controller](that)
      })
    })
  }

  private initOnMEssageHandlers(
    metadata: Array<{ message: string; methodName: string }>,
    controller: Class<any>
  ): Record<string, (data: any) => Promise<any>> {
    return metadata.reduce((acc: Record<string, (data: any) => Promise<any>>, handler) => {
      acc[handler.message] = async (data) => {
        await controller[handler.methodName as keyof typeof controller](data)
      }
      return acc
    }, {})
  }

  async buildOnMessageHandlers(
    metadata: Array<{ message: string; methodName: string }>,
    controller: Class<any>
  ): Promise<void> {
    const handlers = this.initOnMEssageHandlers(metadata, controller)
    this.on('message', async (msg) => {
      if (!msg || !msg.text) return this.logger.error('Receive message but has no text')

      const that = this as any
      that.msg = msg

      if (handlers[msg.text]) {
        this.logger.info(`Receive message from ${msg.chat.id}:${msg.chat.username}`)
        await handlers[msg.text](that)
      }
    })
  }
}
