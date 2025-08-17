import type { Request, Response } from "express";
import type { ISignIn } from "../../_common/types/auth/i-sign-in.js";
import type { ISignUp } from "../../_common/types/auth/i-sign-up.js";
import type { IController } from "../../_common/types/i-controller.js";
import type { IAuthService } from "../../../_common/types/i-auth-service.js";
import type { IBaseCrudService } from "../../../_common/types/i-base-crud-service.js";
import type { IUser } from "../../../_common/types/i-user.js";
import type { UsersModel } from "../../../primary-database/models/users.model";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { SignInSchemas } from "../../_common/validation-schemas/auth/sign-in.schemas";
import { SignUpSchemas } from "../../_common/validation-schemas/auth/sign-up.schemas";
import { validateData } from "../../../_common/middlewares/validate-data.middleware";
import { env } from "../../../env.js";
import { usersService } from "../users/users.service";
import { authService } from "./auth.service";

class AuthController implements IController {
    private readonly _router: Router;
    usersService: IBaseCrudService<UsersModel>;
    authService: IAuthService;

    constructor(usersService: IBaseCrudService<UsersModel>, authService: IAuthService) {
        this._router = Router();
        this.usersService = usersService;
        this.authService = authService;
        this.registerRoutes();
    }

    private registerRoutes() {
        this._router.post("/sign-in", [validateData(SignInSchemas)], this.signIn.bind(this));
        this._router.post("/sign-up", [validateData(SignUpSchemas)], this.signUp.bind(this));
    }

    private async signIn(req: Request, res: Response) {
        const body: ISignIn = req.body;
        const { email, password } = body;

        const user = await this.usersService.findOne({
            where: { email },
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "user with the same email does not exists" });
            return;
        }

        const isPasswordValid = await this.authService.checkIsPasswordValid(password, user.password);

        if (isPasswordValid) {
            const userData: IUser = {
                id: user.id,
                role: user.role,
                email: user.email,
            };
            const token = this.authService.generateToken(userData);
            res.status(StatusCodes.OK).json(token);
            return;
        }

        res.status(StatusCodes.BAD_REQUEST).json({ message: "invalid password" });
    }

    private async signUp(req: Request, res: Response) {
        const body: ISignUp = req.body;

        const userExistsWithEmail = await this.usersService.findOne({
            where: {
                email: body.email,
            },
        });

        if (userExistsWithEmail) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "user with the same email already exists" });
            return;
        }

        try {
            body.password = await this.authService.hashPassword(body.password);
            await this.usersService.createOne(body);
            res.status(StatusCodes.CREATED).json({
                message: "Registration successful. Please log in.",
                redirectTo: env.FRONTEND_SIGN_IN_URL,
            });
        }
        catch (e) {
            console.error(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "error while creating a user" });
        }
    }

    get router(): Router {
        return this._router;
    }
}

export default new AuthController(usersService, authService).router;
