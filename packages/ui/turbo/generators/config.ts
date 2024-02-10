import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("react-component", {
    description: "Adds a new react component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{kebabCase name}}/{{kebabCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "add",
        path: "src/components/{{kebabCase name}}/{{kebabCase name}}.stories.ts",
        templateFile: "templates/story.hbs",
      },
      {
        type: "add",
        path: "src/components/{{kebabCase name}}/index.ts",
        templateFile: "templates/index.hbs",
      },
      {
        type: "append",
        path: "src/index.ts",
        template: "export * from './components/{{kebabCase name}}';",
      },
    ],
  });
}
