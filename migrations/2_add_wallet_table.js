const { MigrationInterface, QueryRunner } = require('typeorm');

export class AddWalletTable1589562131112 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "wallets" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "balance" decimal(10, 2) NOT NULL DEFAULT 0,
        "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "user_id" uuid NOT NULL,
        CONSTRAINT "FK_wallets_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_wallets_user_id" ON "wallets" ("user_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "IDX_wallets_user_id";
    `);

    await queryRunner.query(`
      DROP TABLE "wallets";
    `);
  }
}
