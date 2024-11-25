import {
  registryWithContentArraySchema,
  registryWithContentSchema,
  utilsFilesSchema,
} from "./schema";

const url =
  process.env.REGISTRY_URL ??
  "https://raw.githubusercontent.com/sakupi01/sakupi01.com/main";

export const fetchComponent = async (components: string[]) => {
  const promises = components.map(async (component) => {
    try {
      const componentContentData = await fetch(
        `${url}/packages/git-green/src/components/${component}/${component}.tsx`,
      );
      const styleContentData = await fetch(
        `${url}/packages/git-green/src/components/${component}/${component}.module.css`,
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

export const fetchUtils = async (needTypeFile: boolean) => {
  try {
    const variablesContentData = await fetch(
      `${url}/packages/git-green/src/components/constants/variables.ts`,
    );
    const variablesContent = await variablesContentData.text();

    if (needTypeFile) {
      const enumsContentData = await fetch(
        `${url}/packages/git-green/src/components/types/enums.ts`,
      );
      const typesContentData = await fetch(
        `${url}/packages/git-green/src/components/types/index.ts`,
      );
      const enumsContent = await enumsContentData.text();
      const typesContent = await typesContentData.text();
      return utilsFilesSchema.parse({
        variablesContent,
        enumsContent,
        typesContent,
      });
    }
    return utilsFilesSchema.parse({
      variablesContent,
    });
  } catch {
    throw new Error("Failed to fetch some utils files");
  }
};
