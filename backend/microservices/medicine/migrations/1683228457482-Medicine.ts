import {MigrationInterface, QueryRunner} from "typeorm";

export class Medicine1683228457482 implements MigrationInterface {
    name = 'Medicine1683228457482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medicine" (
                "id" character varying NOT NULL,
                "aggregateId" character varying NOT NULL,
                "aggregateVersion" integer NOT NULL,
                "eventName" character varying NOT NULL,
                "payload" jsonb,
                "saved" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-05-04T19:27:38.151Z"',
                CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_d9a60764b41b6134e34257c73c" ON "medicine" ("aggregateId", "aggregateVersion")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d9a60764b41b6134e34257c73c"
        `);
        await queryRunner.query(`
            DROP TABLE "medicine"
        `);
    }

}
