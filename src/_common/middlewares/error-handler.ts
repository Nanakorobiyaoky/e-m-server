import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line unused-imports/no-unused-vars
    next: NextFunction,
) {
    console.error(err);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
    });
}
