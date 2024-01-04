import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { getManager } from 'typeorm'
import { Patient } from './Patient'

@injectable()
export class PatientRepository extends Repository(Patient) {
  constructor(logger: Logger) {
    super(logger)
  }

  async findAllByHospitalId(
    { hospitalId, limit, offset }: { hospitalId: string; limit: number; offset: number },
    em = getManager()
  ): Promise<Patient[]> {
    return em
      .createQueryBuilder(Patient, 'p')
      .select()
      .where(`p.hospitalId = :hospitalId`, { hospitalId })
      .limit(limit || 7)
      .offset(offset || 0)
      .getMany()
  }

  async findAllByPhone(phone: string, em = getManager()): Promise<any[]> {
    return em.query(`
      SELECT *
      FROM patient
      WHERE "phoneNumber" = '${phone}'
    `)
  }
}
