import { module } from '@elikar/module'

import { HospitalProxy } from './HospitalProxy'
import { MedicineProxy } from './MedicineProxy'
import { NurseProxy } from './NurseProxy'
import { PatientProxy } from './PatientProxy'

@module({
  deps: {
    services(local) {
      local.bind(HospitalProxy).toSelf().inSingletonScope()
      local.bind(NurseProxy).toSelf().inSingletonScope()
      local.bind(MedicineProxy).toSelf().inSingletonScope()
      local.bind(PatientProxy).toSelf().inSingletonScope()
    }
  }
})
export class ProxyModule {}
