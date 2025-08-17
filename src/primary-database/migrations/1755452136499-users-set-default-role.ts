import type { MigrationInterface, QueryRunner } from "typeorm";

export class UsersSetDefaultRole1755452136499 implements MigrationInterface {
    name = "UsersSetDefaultRole1755452136499";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('admin', 'user') NOT NULL`);
    }
}
