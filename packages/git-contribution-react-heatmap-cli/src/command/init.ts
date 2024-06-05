import type { Command } from "commander";
import ora from "ora";
import { checkTailwindCSS } from "../utils/check-deps";
import { createComponent } from "../utils/create-components";
import { createUtils } from "../utils/create-utils";
import { fetchComponent, fetchUtils } from "../utils/registry";

// Define the command to initialize the environment to generate the heatmap in tailwindcss and with given types and constants
// > bun git-heatmap init -d <directory>
export const init = (program: Command) =>
  program
    .command("init")
    .description("Initialize the environment to generate the heatmap")
    .requiredOption(
      "-d, --directory <directory>",
      "The directory to generate the heatmap",
    )
    .action(async (options) => {
      const { directory } = options;
      const spinner = ora();

      // check if tailwindcss is installed
      spinner.start("Checking if tailwindcss is installed...");
      const isTailwindCSSInstalled = await checkTailwindCSS();
      if (!isTailwindCSSInstalled) {
        spinner.fail(
          "tailwindcss is not installed. Please install it first adopting your project. See: https://tailwindcss.com/docs/installation/framework-guides",
        );
        spinner.stop();
        return;
      }
      spinner.succeed("tailwindcss is installed!");
      spinner.stop();

      try {
        // fetch files from GitHub
        spinner.start("Fetching files...");
        const files = await fetchUtils();
        spinner.succeed("Files are fetched from GitHub!");
        spinner.stop();

        // set files under the given directory
        spinner.start(`Setting files under ${directory}`);
        createUtils(directory, files);
        spinner.succeed(
          `Files are set under ${directory}/constants and ${directory}/types`,
        );
        spinner.stop();
      } catch {
        spinner.fail("There was an error fetching the components");
        spinner.stop();
      }
      spinner.clear();
    });
