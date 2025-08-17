import type { NextFunction, Response } from "express";

import { StatusCodes } from "http-status-codes";

import type { UserRolesEnum } from "../enums/user-roles.enum";
import type { IAuthService } from "../types/i-auth-service.js";
import type { _Request } from "../types/request.js";

export function authMiddleware(authService: IAuthService, roles?: UserRolesEnum[]) {
    return (req: _Request, res: Response, next: NextFunction) => {
        const authHeader = req.header("authorization");
        if (!authHeader) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorised" });
            return;
        }

        try {
            const [, token] = authHeader.split(" ");
            const user = authService.verifyToken(token);
            if (roles?.length && !roles.includes(user.role)) {
                res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden Resource" });
                return;
            }
            req.user = user;
        }
        catch (e) {
            console.error(e);
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorised" });
            return;
        }
        next();
    };
}
