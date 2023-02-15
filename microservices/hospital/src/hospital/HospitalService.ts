import { HospitalDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { BcryptService } from '@elikar/bcrypt'
import { JWTService } from '@elikar/jwt'

import { AlreadyExistsError, WrongCredentials } from './errors'
import { Hospital } from './Hospital'
import { HospitalRepository } from './HospitalRepository'

@injectable()
export class HospitalService {
  constructor(
    private readonly repository: HospitalRepository,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JWTService
  ) {}

  async create(data: HospitalDto.CreateHospital): Promise<void> {
    const passwordHash = await this.bcrypt.hash(data.password)

    const hospital = Hospital.create({ ...data, password: passwordHash })
    await this.repository.save(hospital)
  }

  async validateCreation({ email }: HospitalDto.CreateHospital): Promise<void> {
    const hospital = await this.repository.findOne({ email })
    if (hospital) throw new AlreadyExistsError()

    return
  }

  async signIn({ email, password }: HospitalDto.SignIn): Promise<{ token: string }> {
    const admin = await this.repository.findOne({ email })
    if (!admin) throw new WrongCredentials()

    if (!(await this.bcrypt.compare(password, admin.password))) throw new WrongCredentials()

    return {
      token: this.jwt.sign({ id: admin.id }, { expiresIn: '1h' })
    }
  }
}
