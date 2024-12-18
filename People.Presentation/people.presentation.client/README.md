# Frontend using React + Vite + Typescript
### Author: Ben Matela

If you're working on modern web applications with TypeScript, Vite is an excellent tool to consider for faster builds, simpler setup, and a better developer experience.

## Why Use Vite with TypeScript?

* Speed: Vite's use of esbuild for development makes TypeScript compilation extremely fast.
* Zero Configuration: Vite comes with built-in TypeScript support, requiring minimal configuration.
* Optimized Production Builds: Vite uses Rollup for production builds, providing optimized output.
* Modern Tooling: Vite is designed to leverage the latest web standards, offering better support for ES modules and TypeScript.
* Developer Experience: Vite provides fast feedback through HMR, error overlays, and modern debugging support.
* Plugin Ecosystem: Vite's ecosystem is rich, with support for TypeScript-related tools and frameworks.

```md
people.presentation.client/
├── nginx/
│   └── default.conf # default Nginx config file used by Docker to deploy
├── public/ # public files
├── src/
│   ├── assets/ # assets used in the app
│   ├── components/ # shared components
│   ├── models/ # all app models
│   ├── pages/  # domain specific pages (componets) but different from the shared modules
│   ├── services/ #  services used to make for example API calls
│   ├── tests/  # our app test files 
│   └── utils/ # common helper functions
```

## How It All Fits Together

This structure encourages separation of concerns and maintains modularity within our application. Here’s how everything typically works together:

* `assets`: Provides static resources that support the look and feel of the application (images, fonts, icons, etc.).
* `components`: Contains reusable, small building blocks of the UI (buttons, cards, headers).
* pages: Contains components that represent the actual content for each page or view in the app (Home, About, etc.). These are typically tied to routing.
* `models`: Models define the structure of data. For instance, a User model might define what a user object looks like (name, email, age, etc.), and this model would be used in the `userService` to ensure the data is consistent.
* `services`: Handles business logic like fetching data from APIs or managing authentication.
* `tests`: Contains tests for ensuring the application behaves as expected.
* `utils`: Provides reusable helper functions and custom hooks that can be used across the application.

## Example Workflow:
Creating a New Feature:

* You start by adding a new page in the pages folder (e.g. SettingsPage).
* You create a new SettingsForm component in the components folder.
* You add a settingsService.js file in the services folder to interact with an API that saves the settings.
* You write any helper functions needed for the feature in utils.
* You define a Settings model in models to describe the data structure.
* You write unit tests for the SettingsForm and the SettingsPage in the tests folder.