import { MailerDto } from '@elikar/dto';
export declare class MailerRpcSchema {
    queueName: string;
    send: (data: MailerDto.SendMail) => Promise<void>;
}
//# sourceMappingURL=mailer.d.ts.map