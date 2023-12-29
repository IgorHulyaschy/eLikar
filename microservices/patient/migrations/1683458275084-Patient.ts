import {MigrationInterface, QueryRunner} from "typeorm";

export class Patient1683458275084 implements MigrationInterface {
    name = 'Patient1683458275084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "patient" (
                "id" character varying NOT NULL,
                "fname" character varying NOT NULL,
                "lname" character varying NOT NULL,
                "hospitalId" character varying NOT NULL,
                "isHealthy" boolean NOT NULL DEFAULT false,
                "phoneNumber" character varying NOT NULL,
                "diagnosis" character varying NOT NULL,
                CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "patient"
        `);
    }

}
