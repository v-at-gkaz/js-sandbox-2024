import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1715796059848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE public.role2 (
            id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            name character varying NOT NULL,
            the_description character varying
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE public.role2
        `);
  }
}
