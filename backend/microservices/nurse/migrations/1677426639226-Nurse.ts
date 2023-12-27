import {MigrationInterface, QueryRunner} from "typeorm";

export class Nurse1677426639226 implements MigrationInterface {
    name = 'Nurse1677426639226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "nurse" (
                "id" character varying NOT NULL,
                "fname" character varying NOT NULL,
                "lname" character varying NOT NULL,
                "hospitalId" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "tgId" character varying,
                "isActive" boolean NOT NULL DEFAULT true,
                "phoneNumber" character varying NOT NULL,
                CONSTRAINT "UQ_ad880c9af2632fd21aeb3f7b06a" UNIQUE ("email"),
                CONSTRAINT "UQ_aa1367788c7f75f63ebc3391b8f" UNIQUE ("tgId"),
                CONSTRAINT "PK_f48bb9f67d3ede34c65e7104d17" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "nurse"
        `);
    }

}
