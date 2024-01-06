import { Logger } from '@elikar/logger'
import { Repository } from '@elikar/typeorm'
import { injectable } from 'inversify'
import { getManager } from 'typeorm'
import { MedicalHistory } from './MedicalHistory'

@injectable()
export class MedicalHistoryRepository extends Repository(MedicalHistory) {
  constructor(logger: Logger) {
    super(logger)
  }

  findHistory(patientId: string, em = getManager()): Promise<any[]> {
    return em.query(`
      SELECT *
      FROM medical_history
      WHERE "patientId" = '${patientId}'
      ORDER BY "createdAt" DESC
    `)
  }

  findNurseHistory(nurseId: string, em = getManager()): Promise<any[]> {
    return em.query(`
      SELECT *
      FROM medical_history
      WHERE "nurseId" = '${nurseId}'
      ORDER BY "createdAt" DESC
    `)
  }
}
