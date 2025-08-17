import { z } from "zod";

import type { ValidationSchemas } from "../../../../_common/types/validation-schemas.js";

export const getListSchemas: ValidationSchemas = {
    query: z.object({
        limit: z.coerce.number().int().min(1),
        offset: z.coerce.number().int().min(0),
    }),
};
