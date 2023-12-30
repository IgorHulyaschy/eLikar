import {MigrationInterface, QueryRunner} from "typeorm";

export class Nurse1703929733944 implements MigrationInterface {
    name = 'Nurse1703929733944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "nurse"
            ADD "position" character varying NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "nurse"
            ADD "specialist" character varying NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "nurse" DROP COLUMN "specialist"
        `);
        await queryRunner.query(`
            ALTER TABLE "nurse" DROP COLUMN "position"
        `);
    }

}
