#! /usr/bin/env node
import { Command } from "commander";
import ora from "ora";
import { generate } from "./command/generate";
import { createComponent } from "./utils/create-components";
import { fetchComponent } from "./utils/registry";

function main() {
  // Define the version and description of the CLI
  const program = new Command()
    .name("git-contribution-react-heatmap-cli")
    .version("0.0.1")
    .description("Git Contribution Heatmap CLI");

  generate(program);

  program.parse(process.argv);
}

main();
