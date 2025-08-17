import type { ZodTypeAny } from "zod";

export type ValidationSchemas = {
    params?: ZodTypeAny;
    body?: ZodTypeAny;
    query?: ZodTypeAny;
};
