const { MigrationInterface, QueryRunner } = require('typeorm');

export class AddUserTable1589562131112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "username" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "role" character varying NOT NULL DEFAULT 'mentee',
        "status" character varying NOT NULL DEFAULT 'active'
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_users_email" ON "users" ("email");
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_users_username" ON "users" ("username");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "IDX_users_username";
    `);

    await queryRunner.query(`
      DROP INDEX "IDX_users_email";
    `);

    await queryRunner.query(`
      DROP TABLE "users";
    `);
  }
}
