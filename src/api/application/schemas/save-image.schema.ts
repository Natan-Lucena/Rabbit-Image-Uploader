import { z } from "zod";
import { validationErrors } from "../../shared/core/validation-erros";

export const saveImageSchema = z.object({
  externalId: z.string({
    invalid_type_error: validationErrors.string("externalId"),
  }),
});
