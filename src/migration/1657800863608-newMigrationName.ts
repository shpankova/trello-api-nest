import { MigrationInterface, QueryRunner } from 'typeorm';

export class newMigrationName1657800863608 implements MigrationInterface {
  name = 'newMigrationName1657800863608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cards" ("card_id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "estimate" text NOT NULL, "status" text NOT NULL, "due_date" TIMESTAMP WITH TIME ZONE NOT NULL, "labels" text NOT NULL, "board_id" integer, CONSTRAINT "PK_0feb2239f0c3b16c38cb62129c7" PRIMARY KEY ("card_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boards" ("board_id" SERIAL NOT NULL, "name" text NOT NULL, "color" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_82bb5f65adefd484a93936c130e" PRIMARY KEY ("board_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" text NOT NULL, "hashedRt" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cards" ADD CONSTRAINT "FK_98f2b644870026b55fc42b9ae32" FOREIGN KEY ("board_id") REFERENCES "boards"("board_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cards" DROP CONSTRAINT "FK_98f2b644870026b55fc42b9ae32"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "boards"`);
    await queryRunner.query(`DROP TABLE "cards"`);
  }
}
