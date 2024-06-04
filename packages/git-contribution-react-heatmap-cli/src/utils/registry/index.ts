import {
  registryWithContentArraySchema,
  registryWithContentSchema,
} from "./schema";

const url =
  process.env.REGISTRY_URL ??
  "https://raw.githubusercontent.com/saku-1101/saku-apps/main";

export const fetchComponent = async (components: string[]) => {
  const promises = components.map(async (component) => {
    try {
      const content = await fetch(
        `${url}/packages/ui/src/components/${component}/${component}.tsx`,
      );
      const data = await content.text();
      return registryWithContentSchema.parse({
        name: component,
        content: data,
      });
    } catch {
      throw new Error(`Component ${component} is not found`);
    }
  });

  const items = await Promise.all(promises);

  return registryWithContentArraySchema.parse(items);
};
