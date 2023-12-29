import { ApplicationModule } from '@elikar/module'
import { App } from './App'
import { AppModule } from './AppModule'
import { ConfigService } from './config'

function main(): Promise<void> {
  const ioc = new ApplicationModule(AppModule.register(new ConfigService()))
  ioc.init()

  const app = ioc.get(App)

  return app.start(ioc)
}

main()
