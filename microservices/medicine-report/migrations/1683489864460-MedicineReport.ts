import {MigrationInterface, QueryRunner} from "typeorm";

export class MedicineReport1683489864460 implements MigrationInterface {
    name = 'MedicineReport1683489864460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medicine-report" (
                "id" character varying NOT NULL,
                "medicineId" character varying NOT NULL,
                "nurseId" character varying NOT NULL,
                "patientId" character varying NOT NULL,
                "count" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-05-07T20:04:25.072Z"',
                CONSTRAINT "PK_f65854d0ae3eb030de50009c209" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "medicine-report"
        `);
    }

}
