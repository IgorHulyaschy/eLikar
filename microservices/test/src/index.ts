/* eslint-disable @typescript-eslint/no-extraneous-class */
// import { Container } from 'inversify'
// import { App } from './App'
// import { AppModule } from './container'

import { App } from './App'
import { container } from './container'

function main(): any {
  const app = container.get(App)

  app.init(container)
}
main()
