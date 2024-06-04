import { registryWithContentSchema } from "./schema";

const url =
  process.env.REGISTRY_URL ??
  "https://raw.githubusercontent.com/saku-1101/saku-apps/main";

export const fetchComponent = async (component: string) => {
  console.log("Fetching component from GitHub...");
  const content = await fetch(
    `${url}/packages/ui/src/components/${component}/${component}.tsx`,
  );

  const data = await content.text();
  return registryWithContentSchema.parse({ name: component, content: data });
};
