import {MigrationInterface, QueryRunner} from "typeorm";

export class Hospital1675507651382 implements MigrationInterface {
    name = 'Hospital1675507651382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "hospital" (
                "id" character varying NOT NULL,
                "name" character varying NOT NULL,
                "address" jsonb NOT NULL,
                "verified" boolean NOT NULL DEFAULT false,
                "email" character varying NOT NULL,
                CONSTRAINT "UQ_4644586801989134e9a0939f63f" UNIQUE ("email"),
                CONSTRAINT "PK_10f19e0bf17ded693ea0da07d95" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "hospital"
        `);
    }

}
