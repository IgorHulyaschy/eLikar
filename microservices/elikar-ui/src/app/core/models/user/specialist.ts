export enum Specialist {
  SURGEON = 'SURGEON',
  THERAPIST = 'THERAPIST',
  UROLOGIST = 'UROLOGIST',
  GYNECOLOGIST = 'GYNECOLOGIST'
}

export class SpecialistUtil {

  public static getSpecialist(specialist: string): Specialist {
    switch (specialist) {
      case Specialist.GYNECOLOGIST.toString():
        return Specialist.GYNECOLOGIST
      case Specialist.SURGEON.toString():
        return Specialist.SURGEON
      case Specialist.THERAPIST.toString():
        return Specialist.THERAPIST
      case Specialist.UROLOGIST.toString():
        return Specialist.UROLOGIST
    }
  }
}