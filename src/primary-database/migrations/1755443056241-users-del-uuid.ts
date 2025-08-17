import type { MigrationInterface, QueryRunner } from "typeorm";

export class UsersDelUuid1755443056241 implements MigrationInterface {
    name = "UsersDelUuid1755443056241";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`uuid\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`uuid\` varchar(36) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\` (\`uuid\`)`);
    }
}
