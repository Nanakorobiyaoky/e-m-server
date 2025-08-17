import type { DataSourceOptions } from "typeorm";

import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { env } from "../../env.js";

dotenv.config();
export const dataSourceOptionsMysql: DataSourceOptions = {
    type: "mysql",
    host: env.PRIMARY_DATABASE_HOST,
    port: env.PRIMARY_DATABASE_PORT,
    username: env.PRIMARY_DATABASE_USERNAME,
    password: env.PRIMARY_DATABASE_PASSWORD,
    database: env.PRIMARY_DATABASE_NAME,
    entities: ["src/primary-database/models/*.model.ts"],
    synchronize: false,
    migrations: ["src/primary-database/migrations/*.ts"],
};

export const dataSource = new DataSource(dataSourceOptionsMysql);
