import { ApplicationModule } from '@elikar/module'
import { App } from './App'
import { AppModule } from './AppModule'
import { ConfigService } from './config'

function main(): void {
  const ioc = new ApplicationModule(AppModule.register(new ConfigService()))
  ioc.init()
  const app = ioc.get(App)

  app.start(ioc)
}

main()
