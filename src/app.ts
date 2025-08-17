import cors from "cors";
import express from "express";
import "reflect-metadata";
import { StatusCodes } from "http-status-codes";

import { errorHandler } from "./_common/middlewares/error-handler.js";
import auth from "./api/resourses/auth/auth.controller";
import users from "./api/resourses/users/users.controller";
import { dataSource } from "./primary-database/configs/orm.cli.config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
    try {
        await dataSource.query("select 1");
    }
    catch (e) {
        console.error(e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "server is busy",
        });
        return;
    }
    res.status(StatusCodes.OK).json({
        message: "server is ready",
    });
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(errorHandler);

export default app;
