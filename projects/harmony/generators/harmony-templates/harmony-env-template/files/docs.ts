import { ComponentContext } from '@teambit/generator';

export function envDocsFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.docs.mdx`,
    content: `---
description: 'A Harmony development environment.'
labels: ['env', 'node', 'dev', 'mocha', 'typescript']
---

A reusable development environment for Harmony.  
Use the Harmony environment to create new Harmony aspects, platforms and runtimes.

Features:
- ▶️ TypeScript
- 🧪 Vitest.
- 🧑‍💻 Generator templates include [Harmony Platform](/), [Aspect](/), [Runtime](/) and [Harmony env](/).
- 🚀 Workspace starter
- 🦋 ESLint
- ⚒️ A Harmony optimized build pipeline.
- 👓 React-based Preview

## Use in existing workspaces

Add the development env to your generator configuration on \`workspace.jsonc\`.  

\`\`\`json
{
  "teambit.generator/generator": {
    "envs": [
      "${context.componentId.toStringWithoutVersion()}"
    ]
  }
}
\`\`\`

You can see the generator templates in your workspace using \`bit templates\`.

## Use on an existing component

Use this dev environment on your existing components, by running the following command: 

\`\`\`
bit env set my-component ${context.componentId.toStringWithoutVersion()}
\`\`\`


## Create a NodeJS workspace

You can create a new NodeJS workspace made from this env using the following command:

\`\`\`
bit new node my-workspace --aspect ${context.componentId.toStringWithoutVersion()}
\`\`\`

## Compose your own env

You can base on this env, and customize it to your needs. To create your env run this command:
\`\`\`
bit create node-env my-new-env
\`\`\`

Make sure your new environment class extends this env class and overrides the needed class methods.
`,
  };
}
