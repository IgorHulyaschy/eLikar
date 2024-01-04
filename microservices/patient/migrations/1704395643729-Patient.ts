import {MigrationInterface, QueryRunner} from "typeorm";

export class Patient1704395643729 implements MigrationInterface {
    name = 'Patient1704395643729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medical_history" (
                "id" character varying NOT NULL,
                "patientId" character varying NOT NULL,
                "nurseId" character varying NOT NULL,
                "diagnosis" character varying NOT NULL,
                "nurseNotes" character varying,
                "createdAt" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "medical_history"
        `);
    }

}
