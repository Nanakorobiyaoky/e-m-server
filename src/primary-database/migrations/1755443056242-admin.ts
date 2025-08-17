import type { MigrationInterface, QueryRunner } from "typeorm";

import { hash } from "bcrypt";

export class Admin1755443056242 implements MigrationInterface {
    name = "Admin1755443056242";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pass = await hash("adminPassword", 10);
        await queryRunner.query(`insert into \`users\` (fullName, email, password, role) values ('admin', 'admin@admin.com', '${pass}', 'admin');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from \`users\` where 'email' = 'admin@admin.com'`);
    }
}
