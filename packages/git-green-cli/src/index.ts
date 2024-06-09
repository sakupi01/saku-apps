#! /usr/bin/env node
import { Command } from "commander";
import { generate } from "./command/generate";
import { init } from "./command/init";

function main() {
  // Define the version and description of the CLI
  const program = new Command()
    .name("git-green-cli")
    .version("0.0.1")
    .description("Git Contribution Heatmap CLI");

  init(program);
  generate(program);

  program.parse(process.argv);
}

main();
