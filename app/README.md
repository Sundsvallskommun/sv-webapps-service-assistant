Service AI assistant for Sundsvalls kommun. Built using React + TypeScript + Vite.

This is an assistant that can be placed whereever you want it.

- Installation

Run `yarn install`

- For development

Decide on an application name, for example MY_ASSISTANT, and create an env file named .env.MY_ASSISTANT.local base on the .env.example file.

Create an index.html based on the index.html.example template.

To start the development server, run `yarn dev --mode=MY_ASSISTANT` so that the corresponding env file is used.

- Deployment

To build for production, run `yarn build` in order to build.
This will copy the build to the sitevision webapp source.