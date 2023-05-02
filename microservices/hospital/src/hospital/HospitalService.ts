import { HospitalDto } from '@elikar/dto'
import { injectable } from 'inversify'
import { BcryptService } from '@elikar/bcrypt'
import { JWTService } from '@elikar/jwt'

import { AlreadyExistsError, WrongCredentialsError } from './errors'
import { Hospital } from './Hospital'
import { HospitalRepository } from './HospitalRepository'
import { HospitalMapper } from './HospitalMapper'
import { MailerService } from '../mailer'

@injectable()
export class HospitalService {
  constructor(
    private readonly repository: HospitalRepository,
    private readonly mapper: HospitalMapper,
    private readonly bcrypt: BcryptService,
    private readonly jwt: JWTService,
    private readonly mailerService: MailerService
  ) {}

  async create(data: HospitalDto.CreateHospital): Promise<void> {
    const passwordHash = await this.bcrypt.hash(data.password)

    const hospital = Hospital.create({ ...data, password: passwordHash })
    await this.repository.save(hospital)
  }

  async get(id: string): Promise<HospitalDto.Hospital> {
    const hospital = await this.repository.findOne({ id })
    if (!hospital) throw new Error()

    return this.mapper.toDto(hospital)
  }

  async validateCreation({ email }: HospitalDto.CreateHospital): Promise<void> {
    const hospital = await this.repository.findOne({ email })
    if (hospital) throw new AlreadyExistsError()

    return
  }

  async signIn({ email, password }: HospitalDto.SignIn): Promise<{ token: string }> {
    const admin = await this.repository.findOne({ email })
    if (!admin) throw new WrongCredentialsError()

    if (!(await this.bcrypt.compare(password, admin.password))) throw new WrongCredentialsError()

    return {
      token: this.jwt.sign({ id: admin.id }, { expiresIn: '1h' })
    }
  }

  async validateToken(token: string): Promise<HospitalDto.Hospital | null> {
    const payload = await this.jwt.verify<{ id: string }>(token)

    if (!payload) return null

    const admin = await this.repository.findOne({ id: payload.id })
    if (!admin) return null

    return this.mapper.toDto(admin)
  }

  sendRegistrationLettersForNurses(emails: string[], hospitalId: string): Promise<void> {
    return this.mailerService.sendRegistrationLetters(emails, hospitalId)
  }
}
