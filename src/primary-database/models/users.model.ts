import { Column, Entity, Unique } from "typeorm";

import { UserRolesEnum } from "../../_common/enums/user-roles.enum";
import { BaseModel } from "./base-model/base.model";

@Entity("users")
@Unique(["email"])
export class UsersModel extends BaseModel {
    @Column({ type: "varchar", nullable: false })
    fullName: string;

    @Column({ type: "varchar", nullable: false })
    email: string;

    @Column({ type: "date", nullable: true })
    dateOfBirth: Date;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: "enum", enum: UserRolesEnum, default: UserRolesEnum.user })
    role: UserRolesEnum;

    @Column({ type: "boolean", default: true })
    isActive: boolean;
}
