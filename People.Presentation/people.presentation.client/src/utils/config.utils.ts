const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV as string;
const VITE_PORT = parseInt(import.meta.env.VITE_PORT as string);
const nodeEnv = VITE_NODE_ENV;
const port = VITE_PORT;
const server = {
  peopleApiBaseUrl:  "http://0.0.0.0:5050" // get from .env
};

export default {
  server,
  nodeEnv,
  port,
};
