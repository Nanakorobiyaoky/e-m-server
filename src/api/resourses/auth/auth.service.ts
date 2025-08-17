import type { SignOptions, VerifyOptions } from "jsonwebtoken";

import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import type { IAuthService } from "../../../_common/types/i-auth-service.js";
import type { IUser } from "../../../_common/types/i-user.js";

import { env } from "../../../env.js";

class AuthService implements IAuthService {
    async hashPassword(password: string) {
        return await hash(password, 10);
    }

    generateToken(payload: any, options?: SignOptions): { token: string } {
        const signOptions = { ...this.getDefaultSignOptions(), ...options };

        const token = sign({ ...payload }, env.JWT_SECRET, signOptions);

        return { token };
    }

    async checkIsPasswordValid(inputPassword: string, savedPassword: string) {
        const isPasswordValid = await compare(
            inputPassword,
            savedPassword,
        );

        return isPasswordValid;
    }

    verifyToken(token: string, options?: VerifyOptions): IUser {
        const verifyOptions = { ...this.getDefaultVerifyOptions(), options };

        const verifyPayload = verify(token, env.JWT_SECRET, verifyOptions);
        return verifyPayload as IUser;
    }

    private getDefaultSignOptions(): SignOptions {
        return { expiresIn: 86400 };
    }

    private getDefaultVerifyOptions(): VerifyOptions {
        return { complete: false, ignoreExpiration: false, ignoreNotBefore: false };
    }
}

export const authService = new AuthService();
