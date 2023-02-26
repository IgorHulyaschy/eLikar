import { Logger } from '@elikar/logger'
import { inject, injectable } from 'inversify'
import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import { MailerDto } from '@elikar/dto'
import * as fs from 'fs'

import { TYPES } from './constants'
import { Options } from './interfaces'

@injectable()
export class SendPulseService {
  static unauthorizedErrorCode = [401, 5]

  private accessToken!: string
  private readonly accessTokenRequestBody: URLSearchParams
  private readonly from: { email: string; name: string }
  constructor(
    @inject(TYPES.Options) { grantType, clientId, clientSecret, senderName, from }: Options,
    private readonly logger: Logger
  ) {
    this.accessTokenRequestBody = new URLSearchParams()
    this.accessTokenRequestBody.append('grant_type', grantType)
    this.accessTokenRequestBody.append('client_id', clientId)
    this.accessTokenRequestBody.append('client_secret', clientSecret)
    this.from = { email: from, name: senderName }
  }

  private async getAccessToken(): Promise<void> {
    const res = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      body: this.accessTokenRequestBody
    })
    const data: { token_type: string; access_token: string } = await res.json()
    this.accessToken = `${data.token_type} ${data.access_token}`
  }

  async send({ to, subject, template }: MailerDto.SendMail): Promise<void> {
    const receivers = Array.isArray(to)
      ? to.map((email) => {
          return { email }
        })
      : [{ email: to }]

    const params = new URLSearchParams()

    params.append(
      'email',
      JSON.stringify({
        html: fs.readFileSync('./index.html').toString('base64'),
        subject,
        from: this.from,
        to: receivers
      })
    )
    const res = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      body: params,
      headers: {
        Authorization: this.accessToken
      }
    })
    const data: { id: string } | { message: string; error_code: number } = await res.json()

    if ('error_code' in data) {
      if (SendPulseService.unauthorizedErrorCode.includes(data.error_code)) {
        await this.getAccessToken()
        return this.send({ to, template, subject })
      }
      return this.logger.error(
        `Error while trying to send mail letter to ${to}: ${data.message} with status code: ${data.error_code}`
      )
    }
  }
}
