import {MigrationInterface, QueryRunner} from "typeorm";

export class ElectronicQueue1703962622007 implements MigrationInterface {
    name = 'ElectronicQueue1703962622007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "electronic_queue" (
                "id" character varying NOT NULL,
                "hospitalId" character varying NOT NULL,
                "nurseId" character varying NOT NULL,
                "patientId" character varying NOT NULL,
                "status" character varying NOT NULL,
                "dayOfMonth" TIMESTAMP NOT NULL,
                "bookedTime" character varying NOT NULL,
                CONSTRAINT "PK_fb4fd65d3076946c4f404863fa0" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "electronic_queue"
        `);
    }

}
