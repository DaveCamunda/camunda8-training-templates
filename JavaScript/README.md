# Template for the Camunda 8 for developers training with Node

Welcome to the Camunda 8 for developers training template for Node.js!
This template provides a starting point for developers to get hands-on experience with Camunda 8 using the Node.js environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (LTS version recommended). You can download it and find installation instructions on the [official Node.js website](https://nodejs.org/).
- npm (this comes bundled with Node.js, so there is no need for a separate installation).

## Preparation steps

1. **Install the client with:**

```bash
npm install @camunda8/sdk
```

2. **Run the program:**

```bash
node worker.js
```

## Client Documentation

https://github.com/camunda/camunda-8-js-sdk/

## Troubleshooting

If you encounter issues with installing or verifying the Camunda 8 SDK, here are some troubleshooting steps:

1. **Installation Issues**: If `npm install @camunda8/sdk` fails:
   - Ensure that you have an active internet connection and access to the npm registry.
   - Check if the package name is correct and the package exists in the npm registry.
   - Confirm that you are using a recent version of Node.js and npm.

2. **Library Loading Issues**: If running `worker.js` results in errors:
   - Make sure that the `@camunda8/sdk` package is correctly installed in your `node_modules` folder.
   - If you receive a "Cannot find module" error, try reinstalling the package or check your `require` path.
   - Look at the error stack trace for clues on what might be wrong with the library installation.

