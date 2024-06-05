import { z } from "zod";

export const registryWithContentSchema = z.object({
  name: z.string(),
  componentContent: z.string(),
  styleContent: z.string(),
});

export const registryWithContentArraySchema = z.array(
  registryWithContentSchema,
);

export const utilsFilesSchema = z.object({
  variablesContent: z.string(),
  enumsContent: z.string(),
  typesContent: z.string(),
});

export type RegistryWithContent = z.infer<typeof registryWithContentSchema>;
export type RegistryWithContentArray = z.infer<
  typeof registryWithContentArraySchema
>;
export type UtilsFiles = z.infer<typeof utilsFilesSchema>;
