import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development"]).default("development"),
    SERVER_PORT: z.coerce.number().default(3000),
    PRIMARY_DATABASE_HOST: z.string({}),
    PRIMARY_DATABASE_PORT: z.coerce.number().positive(),
    PRIMARY_DATABASE_PASSWORD: z.string().min(1),
    PRIMARY_DATABASE_USERNAME: z.string().min(1),
    PRIMARY_DATABASE_NAME: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    FRONTEND_SIGN_IN_URL: z.string().default("frontend-sign-in-link"),
});

try {
    // eslint-disable-next-line node/no-process-env
    envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof z.ZodError) {
        console.error("Missing environment variables:", error.issues.flatMap(issue => issue.path));
    }
    else {
        console.error(error);
    }
    process.exit(1);
}

// eslint-disable-next-line node/no-process-env
export const env = envSchema.parse(process.env);
