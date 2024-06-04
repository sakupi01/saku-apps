import { z } from "zod";

export const registryWithContentSchema = z.object({
  name: z.string(),
  content: z.string(),
});

export const registryWithContentArraySchema = z.array(
  registryWithContentSchema,
);
