import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserStructure1716019173752 implements MigrationInterface {
  name = 'ChangeUserStructure1716019173752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "typeorm"."user" ADD "descr" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "typeorm"."user" DROP COLUMN "descr"`);
  }
}
