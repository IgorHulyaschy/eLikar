import { IModule, module } from '@elikar/module'
import { BotProviderModule } from '@elikar/bot-provider'
import { ApplicationBuilderModule } from '@elikar/application'
import { RpcClientModule } from '@elikar/rpc-client'
import { AmqpModule } from '@elikar/amqp'
import { RedisModule } from '@elikar/redis'
import { MessageClientModule } from '@elikar/message-client'
import { LoggerModule } from '@elikar/logger'

import { App } from './App'
import { BotModule } from './bot'
import { ConfigService } from './config'
import { MailerModule } from './mailer'
import { NurseModule } from './nurse'
import { HospitalModule } from './hospital'
import { PatientModule } from './patient'
import { MedicineModule } from './medicine'

export const TYPES = {
  Options: 'Options'
}

@module()
export class AppModule {
  static register(config: ConfigService): IModule {
    return {
      imports: [
        AmqpModule.register(config.get('amqp')),
        BotProviderModule.register(config.get('bot')),
        RedisModule.register(config.get('redis')),
        ApplicationBuilderModule,
        RpcClientModule,
        MessageClientModule,
        LoggerModule,
        BotModule,
        MailerModule,
        NurseModule,
        HospitalModule,
        PatientModule,
        MedicineModule
      ],
      deps: {
        services(container) {
          container.bind(App).toSelf().inSingletonScope()
          container.bind(TYPES.Options).toConstantValue(config.get('application'))
        }
      }
    }
  }
}
