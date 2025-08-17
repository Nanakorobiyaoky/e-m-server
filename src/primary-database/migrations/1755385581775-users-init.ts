import type { MigrationInterface, QueryRunner } from "typeorm";

export class UsersInit1755385581775 implements MigrationInterface {
    name = "UsersInit1755385581775";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL DEFAULT '1', \`deletedAt\` datetime(6) NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`dateOfBirth\` date NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }
}
