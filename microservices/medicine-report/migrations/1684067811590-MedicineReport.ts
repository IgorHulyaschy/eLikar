import {MigrationInterface, QueryRunner} from "typeorm";

export class MedicineReport1684067811590 implements MigrationInterface {
    name = 'MedicineReport1684067811590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "medicine-report"
            ALTER COLUMN "createdAt" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "medicine-report"
            ALTER COLUMN "createdAt"
            SET DEFAULT '2023-05-07 20:04:25.072'
        `);
    }

}
