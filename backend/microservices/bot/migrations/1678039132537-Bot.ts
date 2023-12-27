import {MigrationInterface, QueryRunner} from "typeorm";

export class Bot1678039132537 implements MigrationInterface {
    name = 'Bot1678039132537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bot" (
                "id" character varying NOT NULL,
                "email" character varying NOT NULL,
                CONSTRAINT "PK_bc6d59d7870eb2efd5f7f61e5ca" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "bot"
        `);
    }

}
