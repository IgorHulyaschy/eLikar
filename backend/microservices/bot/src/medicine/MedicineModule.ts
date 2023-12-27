import { module } from '@elikar/module'
import { MedicineProxy } from './MedicineProxy'

@module({
  deps: {
    services(container) {
      container.bind(MedicineProxy).toSelf().inSingletonScope()
    }
  }
})
export class MedicineModule {}
