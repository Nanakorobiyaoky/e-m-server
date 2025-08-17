import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import type { ValidationSchemas } from "../types/validation-schemas.js";

export function validateData(schemas: ValidationSchemas) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { query, params, body } = req;
        try {
            schemas.params?.parse(params);
            schemas.query?.parse(query);
            schemas.body?.parse(body);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request", details: JSON.parse(error.message) });
        }
    };
}
