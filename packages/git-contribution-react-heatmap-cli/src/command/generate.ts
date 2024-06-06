import type { Command } from "commander";
import ora from "ora";
import { createComponent } from "../utils/create-components";
import { fetchComponent } from "../utils/registry";

// Define the command to generate the heatmap under the given directory if it is not already present
// > bun git-heatmap generate <components...> -d <directory>
export const generate = (program: Command) =>
  program
    .command("generate")
    .description("Generate the heatmap under the given directory")
    .arguments("<components...>")
    .option(
      "-d, --directory <directory>",
      "The directory to generate the heatmap",
    )
    .action(async (components, options) => {
      const { directory } = options;

      const spinner = ora();
      try {
        // fetch component from GitHub
        spinner.start("Fetching components...");
        const items = await fetchComponent(components);
        spinner.succeed("Components are fetched from GitHub!");
        spinner.stop();

        // create directory and component file under the given directory and write the content
        for (const item of items) {
          spinner.start(`Creating component ${item.name}`);
          createComponent(directory, item);
          spinner.succeed(
            `Component ${item.name} is generated under ${directory}`,
          );
        }
        spinner.stop();
      } catch {
        spinner.fail("There was an error fetching the components");
        spinner.stop();
      }
      spinner.clear();
    });
