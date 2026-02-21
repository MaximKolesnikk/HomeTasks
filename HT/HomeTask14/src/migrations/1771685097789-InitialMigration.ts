import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1771685097789 implements MigrationInterface {
    name = 'InitialMigration1771685097789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "exhibitId" uuid NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exhibits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_63888935e8c674f871d4f851eea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_89cb258e8d851834a8cd5b8b07c" FOREIGN KEY ("exhibitId") REFERENCES "exhibits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exhibits" ADD CONSTRAINT "FK_af1f6e51eda81b2ed2659a40bf2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibits" DROP CONSTRAINT "FK_af1f6e51eda81b2ed2659a40bf2"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_89cb258e8d851834a8cd5b8b07c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "exhibits"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
