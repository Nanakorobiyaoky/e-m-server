import type { UserRolesEnum } from "../enums/user-roles.enum";

export type IUser = {
    id: number;
    email: string;
    role: UserRolesEnum;
};
