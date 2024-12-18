# Frontend using React + Vite + Typescript
### Author: Ben Matela

If you're working on modern web applications with TypeScript, Vite is an excellent tool to consider for faster builds, simpler setup, and a better developer experience.

### Why Use Vite with TypeScript?

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