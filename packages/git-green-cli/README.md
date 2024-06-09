# git-green-cli🪴

This library provides a command-line interface (CLI) tool to inject Github heatmap UI library into your React Projects.

It only provides UI, not data-fetching.
As it's data-fetch agnostic, which means you can fetch the data in either on Server or Client side!

To use this library, you need to have [React](https://react.dev/) and [tailwindcss](https://tailwindcss.com/) installed on your machine.
You can install the library by running the following command:

```bash
npm install git-green-cli
```

Once installed, you can use the CLI tool by running the "git-green" command in your terminal.
The following command can check for you if tailwindcss is installed and initialize to use Github heatmap UI in your project.

```bash
npm git-green init
```

Once you've initialized, you can add Components like so:

```bash
npm git-green gen <component_name>
```

#### Available components

- heatmap
