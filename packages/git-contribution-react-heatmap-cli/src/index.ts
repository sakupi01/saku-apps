#! /usr/bin/env node
import { Command } from "commander";
const program = new Command();

// Define the version and description of the CLI
program
  .name("git-contribution-react-heatmap-cli")
  .version("0.0.1")
  .description("Git Contribution Heatmap CLI");

// Define the command to generate the heatmap under the given directory if it is not already present
// > bun ink generate
program
  .command("generate")
  .description("Generate the heatmap under the given directory")
  .requiredOption(
    "-d, --directory <directory>",
    "The directory to generate the heatmap",
  )
  .action((options) => {
    console.log(options);
    console.log("Generating heatmap under the given directory...");
  });

program.parse(process.argv);
