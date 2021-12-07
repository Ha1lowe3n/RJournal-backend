import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCarmaColumnsAndRelations1638886662864 implements MigrationInterface {
    name = 'AddCarmaColumnsAndRelations1638886662864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_upped_posts_posts" ("usersId" integer NOT NULL, "postsId" integer NOT NULL, CONSTRAINT "PK_e7c0257935aba65df43bbcba073" PRIMARY KEY ("usersId", "postsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7772b71040ec486afb9a325e7d" ON "users_upped_posts_posts" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_493add6fe250cee986715bf3ad" ON "users_upped_posts_posts" ("postsId") `);
        await queryRunner.query(`CREATE TABLE "users_upped_comments_comments" ("usersId" integer NOT NULL, "commentsId" integer NOT NULL, CONSTRAINT "PK_643c46c1a3fd89079e27c3f1d8e" PRIMARY KEY ("usersId", "commentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9651394f2c932abd2e17ab1378" ON "users_upped_comments_comments" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e63749674df90a4c999b1b398" ON "users_upped_comments_comments" ("commentsId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "carma" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "carma" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "carma" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users_upped_posts_posts" ADD CONSTRAINT "FK_7772b71040ec486afb9a325e7d6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_upped_posts_posts" ADD CONSTRAINT "FK_493add6fe250cee986715bf3ad7" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_upped_comments_comments" ADD CONSTRAINT "FK_9651394f2c932abd2e17ab13781" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_upped_comments_comments" ADD CONSTRAINT "FK_0e63749674df90a4c999b1b398a" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_upped_comments_comments" DROP CONSTRAINT "FK_0e63749674df90a4c999b1b398a"`);
        await queryRunner.query(`ALTER TABLE "users_upped_comments_comments" DROP CONSTRAINT "FK_9651394f2c932abd2e17ab13781"`);
        await queryRunner.query(`ALTER TABLE "users_upped_posts_posts" DROP CONSTRAINT "FK_493add6fe250cee986715bf3ad7"`);
        await queryRunner.query(`ALTER TABLE "users_upped_posts_posts" DROP CONSTRAINT "FK_7772b71040ec486afb9a325e7d6"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "carma"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "carma"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "carma"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e63749674df90a4c999b1b398"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9651394f2c932abd2e17ab1378"`);
        await queryRunner.query(`DROP TABLE "users_upped_comments_comments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_493add6fe250cee986715bf3ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7772b71040ec486afb9a325e7d"`);
        await queryRunner.query(`DROP TABLE "users_upped_posts_posts"`);
    }

}
