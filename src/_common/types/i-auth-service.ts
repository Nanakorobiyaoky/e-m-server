import type { SignOptions, VerifyOptions } from "jsonwebtoken";

import type { IUser } from "./i-user.js";

export type IAuthService = {
    hashPassword: (password: string) => Promise<string>;
    generateToken: (payload: any, options?: SignOptions) => { token: string };
    checkIsPasswordValid: (inputPassword: string, savedPassword: string) => Promise<boolean>;
    verifyToken: (token: string, options?: VerifyOptions) => IUser;
};
