import { App } from './App'
import { AppModule } from './AppModule'
import { ConfigService } from './config'

function main(): void {
  const ioc = new AppModule(new ConfigService())
  ioc.init()
  const app = ioc.get(App)

  app.start({
    messageControllers: ioc.getCqrsControllers(),
    rpcControllers: ioc.getRpcControllers(),
    container: ioc
  })
}

main()
