import type { Response } from "express";

import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import type { IController } from "../../_common/types/i-controller.js";
import type { IBaseCrudService } from "../../../_common/types/i-base-crud-service.js";
import type { IUser } from "../../../_common/types/i-user.js";
import type { _Request } from "../../../_common/types/request.js";
import type { UsersModel } from "../../../primary-database/models/users.model";

import { blockOneSchemas } from "../../_common/validation-schemas/users/block-one.schemas";
import { getListSchemas } from "../../_common/validation-schemas/users/get-list.schemas";
import { getOneSchemas } from "../../_common/validation-schemas/users/get-one.schemas";
import { UserRolesEnum } from "../../../_common/enums/user-roles.enum";
import { authMiddleware } from "../../../_common/middlewares/auth.middleware";
import { validateData } from "../../../_common/middlewares/validate-data.middleware";
import { authService } from "../auth/auth.service";
import { usersService } from "./users.service";

class UsersController implements IController {
    private readonly _router: Router;
    userService: IBaseCrudService<UsersModel>;

    constructor(userService: IBaseCrudService<UsersModel>) {
        this._router = Router();
        this.userService = userService;
        this.registerRoutes();
    }

    private registerRoutes() {
        this._router.get("/", [authMiddleware(authService, [UserRolesEnum.admin]), validateData(getListSchemas)], this.getList.bind(this));
        this._router.get("/:id", [authMiddleware(authService), validateData(getOneSchemas)], this.getOne.bind(this));
        this._router.post("/:id/block", [authMiddleware(authService), validateData(blockOneSchemas)], this.blockOne.bind(this));
    }

    private async getList(req: _Request, res: Response) {
        const query = req.query as { limit: string; offset: string };

        const response = await this.userService.findAllAndPaginate({}, { limit: +query.limit, offset: +query.offset });

        res.status(StatusCodes.OK).json(response);
    }

    private async getOne(req: _Request, res: Response) {
        const { id } = req.params as { id: string };
        const user = req.user as IUser;

        if (user.role === UserRolesEnum.user && user.id !== +id) {
            res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden Resource" });
            return;
        }

        const existingUser = await this.userService.findOne({
            where: {
                id: +id,
            },
        });

        if (!existingUser) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
            return;
        }

        res.status(StatusCodes.OK).json(existingUser);
    }

    private async blockOne(req: _Request, res: Response) {
        const { id } = req.params as { id: string };
        const user = req.user as IUser;

        if (user.role === UserRolesEnum.user && user.id !== +id) {
            res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden Resource" });
            return;
        }

        const existingUser = await this.userService.findOne({
            where: {
                id: +id,
            },
        });

        if (!existingUser) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Not Found",
            });
        }

        if (!existingUser.isActive) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: "user already blocked",
            });
        }

        const isSuccess = await this.userService.updateOne(existingUser, { isActive: false });

        if (isSuccess) {
            res.status(StatusCodes.OK)
                .json({ message: "user successfully blocked" });
        }
    }

    get router(): Router {
        return this._router;
    }
}

export default new UsersController(usersService).router;
