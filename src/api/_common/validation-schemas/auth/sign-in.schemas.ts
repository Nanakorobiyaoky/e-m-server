import { z } from "zod";

import type { ValidationSchemas } from "../../../../_common/types/validation-schemas.js";

export const SignInSchemas: ValidationSchemas = {
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
};
