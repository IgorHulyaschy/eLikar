import { App } from './App'
import { AppModule } from './AppModule'
import { ConfigService } from './config'

function main(): Promise<void> {
  const ioc = new AppModule(new ConfigService())
  ioc.init()

  const app = ioc.get(App)

  return app.start({ webControllers: ioc.getWebControllers(), container: ioc })
}

main()
