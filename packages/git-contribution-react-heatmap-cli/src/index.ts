#! /usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";
import { fetchComponent } from "./utils/registry";
const program = new Command();

// Define the version and description of the CLI
program
  .name("git-contribution-react-heatmap-cli")
  .version("0.0.1")
  .description("Git Contribution Heatmap CLI");

// Define the command to generate the heatmap under the given directory if it is not already present
// > bun git-heatmap generate -d <directory> -c <components...>
program
  .command("generate")
  .description("Generate the heatmap under the given directory")
  .requiredOption(
    "-d, --directory <directory>",
    "The directory to generate the heatmap",
  )
  .requiredOption(
    "-c --components <components...>",
    "The components name to generate under the given directory",
  )
  .action(async (options) => {
    console.log(options);
    console.log("Generating heatmap under the given directory...");
    const { directory, components } = options;
    console.log("Directory:", directory, "Components:", components);
    // fetch component from GitHub
    const item = await fetchComponent(components);
    // create directory and component file under the given directory and write the content
    const fileName = `${item.name}.tsx`;
    const filePath = path.join(directory, fileName);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(filePath, item.content, { encoding: "utf-8" });
    console.log(`Component ${item.name} is generated under ${directory}`);
  });

program.parse(process.argv);
