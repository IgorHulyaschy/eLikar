import { NurseDto } from '@elikar/dto'
import { BcryptService } from '@elikar/bcrypt'
import { JWTService } from '@elikar/jwt'

import { injectable } from 'inversify'
import { Nurse } from './Nurse'
import { NurseRepository } from './NurseRepository'
import { AlreadyExistsError, WrongCredentialsError } from './errors'
import { NurseMapper } from './NurseMapper'

@injectable()
export class NurseService {
  constructor(
    private readonly repository: NurseRepository,
    private readonly bcrypt: BcryptService,
    private readonly jwtService: JWTService,
    private readonly mapper: NurseMapper
  ) {}

  async create(dto: NurseDto.CreateNurse): Promise<void> {
    const passwordHash = await this.bcrypt.hash(dto.password)

    const nurse = Nurse.create({ ...dto, password: passwordHash })
    await this.repository.save(nurse)
  }

  async validateCreation(dto: NurseDto.CreateNurse): Promise<void> {
    const nurse = await this.repository.findOne({ email: dto.email })

    if (nurse) throw new AlreadyExistsError()

    return
  }

  async signIn({ email, password }: NurseDto.SignIn): Promise<{ token: string }> {
    const nurse = await this.repository.findOne({ email })
    if (!nurse) throw new WrongCredentialsError()

    if (!(await this.bcrypt.compare(password, nurse.password))) throw new WrongCredentialsError()

    return { token: this.jwtService.sign({ id: nurse.id }, { expiresIn: '1h' }) }
  }

  async validateToken(token: string): Promise<NurseDto.Nurse | null> {
    const payload = await this.jwtService.verify<{ id: string }>(token)
    if (!payload) return null

    const nurse = await this.repository.findOne({ id: payload.id })
    if (!nurse) return null

    return this.mapper.toDto(nurse)
  }

  async setTelegramConnection({
    email,
    id
  }: NurseDto.TelegramConnect): Promise<{ id: string; email: string } | null> {
    const nurse = await this.repository.findOne({ email })
    if (!nurse) return null

    nurse.setTgId(id)
    await this.repository.update(nurse)
    return {
      id,
      email
    }
  }

  async getByTgId(id: string): Promise<NurseDto.Nurse> {
    const nurse = await this.repository.findOne({ tgId: id })
    if (!nurse) throw new Error()

    return this.mapper.toDto(nurse)
  }
}
