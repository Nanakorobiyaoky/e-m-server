import type { UserRolesEnum } from "../../../../_common/enums/user-roles.enum";

export type ISignUp = {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: string;
    role: UserRolesEnum;
};
