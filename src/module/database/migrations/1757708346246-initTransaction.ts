import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTransaction1757708346246 implements MigrationInterface {
  name = 'InitTransaction1757708346246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_type_enum" AS ENUM('WITHDRAWL', 'DEPOSIT', 'TRANSFER')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transaction_status_enum" AS ENUM('IN_PROGRESS', 'COMPLETED', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "amount" character varying NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "status" "public"."transaction_status_enum" NOT NULL DEFAULT 'IN_PROGRESS', CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")); COMMENT ON COLUMN "transaction"."id" IS 'Идентификатор транзакции'; COMMENT ON COLUMN "transaction"."userId" IS 'Идентификатор пользователя, совершающего транзакцию'; COMMENT ON COLUMN "transaction"."amount" IS 'Сумма транзакции в копейках'; COMMENT ON COLUMN "transaction"."type" IS 'Тип транзакции'; COMMENT ON COLUMN "transaction"."status" IS 'Статус транзакции'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
  }
}
