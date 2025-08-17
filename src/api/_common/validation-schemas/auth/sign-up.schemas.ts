import { z } from "zod";

import type { ValidationSchemas } from "../../../../_common/types/validation-schemas.js";

export const SignUpSchemas: ValidationSchemas = {
    body: z.object({
        email: z.string().email(),
        password: z.string(),
        fullName: z.string().min(1),
        dateOfBirth: z.coerce.date(),
    }),
};
