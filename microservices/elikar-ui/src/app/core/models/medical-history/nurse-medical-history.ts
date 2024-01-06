import { MedicalHistoryRecord } from "./medical-history-record";
import { User } from "../user/user";

export class NurseMedicalHistory {
  history: MedicalHistoryRecord[]
  nurse: User
}