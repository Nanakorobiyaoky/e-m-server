import app from "./app.js";
import { env } from "./env.js";
import { dataSource } from "./primary-database/configs/orm.cli.config";

const port = env.SERVER_PORT;
const server = app.listen(port, async () => {
    await dataSource.initialize();
    // eslint-disable-next-line no-console
    console.log(`Listening: http://localhost:${port}`);
});

server.on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
