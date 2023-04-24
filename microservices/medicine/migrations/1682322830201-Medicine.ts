import {MigrationInterface, QueryRunner} from "typeorm";

export class Medicine1682322830201 implements MigrationInterface {
    name = 'Medicine1682322830201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "medicine" (
                "id" character varying NOT NULL,
                "version" integer NOT NULL,
                "eventName" character varying NOT NULL,
                "payload" jsonb,
                "saved" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-04-24T07:53:50.825Z"',
                CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_25b2a9086c56f54102185cff3e" ON "medicine" ("id", "version")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_25b2a9086c56f54102185cff3e"
        `);
        await queryRunner.query(`
            DROP TABLE "medicine"
        `);
    }

}
