import cors from "cors";
import express from "express";
import "reflect-metadata";
import { StatusCodes } from "http-status-codes";

import auth from "./api/resourses/auth/auth.controller";
import users from "./api/resourses/users/users.controller";

const app = express();

app.use(cors());
app.use(express.json());

app.get("api/health", (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "server is ready",
    });
});

app.use("/api/users", users);
app.use("/api/auth", auth);

export default app;
