import { z } from "zod";

import type { ValidationSchemas } from "../../../../_common/types/validation-schemas.js";

export const getOneSchemas: ValidationSchemas = {
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
};
