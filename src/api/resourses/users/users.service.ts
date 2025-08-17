import type { Repository } from "typeorm";

import { BaseCrud } from "../../_common/types/base-crud.service";
import { dataSource } from "../../../primary-database/configs/orm.cli.config";
import { UsersModel } from "../../../primary-database/models/users.model";

class UsersService extends BaseCrud<UsersModel> {
    protected readonly repository: Repository<UsersModel>;

    constructor() {
        super();
        this.repository = dataSource.getRepository(UsersModel);
    }
}

export const usersService = new UsersService();
