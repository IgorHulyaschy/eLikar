import schema from './ConfigSchema'
import convict from 'convict'

export class ConfigService {
  readonly #config = convict(schema).validate()
  readonly get = this.#config.get.bind(this.#config)
}
