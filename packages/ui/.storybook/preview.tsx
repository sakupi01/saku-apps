import type { Preview } from "@storybook/react";
import "../src/styles.css"; // replace with the name of your tailwind css file

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24">
        <Story />
      </main>
    ),
  ],
};

export default preview;
