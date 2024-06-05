import {
  registryWithContentArraySchema,
  registryWithContentSchema,
  utilsFilesSchema,
} from "./schema";

const url =
  process.env.REGISTRY_URL ??
  "https://raw.githubusercontent.com/saku-1101/saku-apps/main";

export const fetchComponent = async (components: string[]) => {
  const promises = components.map(async (component) => {
    try {
      const componentContentData = await fetch(
        `${url}/packages/ui/src/components/${component}/${component}.tsx`,
      );
      const styleContentData = await fetch(
        `${url}/packages/ui/src/components/${component}/${component}.module.css`,
      );
      const componentContent = await componentContentData.text();
      const styleContent = await styleContentData.text();
      return registryWithContentSchema.parse({
        name: component,
        componentContent,
        styleContent,
      });
    } catch {
      throw new Error(`Component ${component} is not found`);
    }
  });

  const items = await Promise.all(promises);

  return registryWithContentArraySchema.parse(items);
};

export const fetchUtils = async () => {
  try {
    const variablesContentData = await fetch(
      `${url}/packages/ui/src/constants/variables.ts`,
    );
    const enumsContentData = await fetch(
      `${url}/packages/ui/src/types/enums.ts`,
    );
    const typesContentData = await fetch(
      `${url}/packages/ui/src/types/index.ts`,
    );
    const variablesContent = await variablesContentData.text();
    const enumsContent = await enumsContentData.text();
    const typesContent = await typesContentData.text();
    return utilsFilesSchema.parse({
      variablesContent,
      enumsContent,
      typesContent,
    });
  } catch {
    throw new Error("Failed to fetch some utils files");
  }
};
