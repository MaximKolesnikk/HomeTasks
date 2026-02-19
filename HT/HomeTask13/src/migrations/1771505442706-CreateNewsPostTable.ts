import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewsPostTable1771505442706 implements MigrationInterface {
    name = 'CreateNewsPostTable1771505442706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news_post" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "content" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_f3da2059a86af58f909bded384c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news_post"`);
    }

}
