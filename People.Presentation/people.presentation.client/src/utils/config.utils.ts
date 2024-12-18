const VITE_NODE_ENV = import.meta.env.VITE_NODE_ENV as string;
const VITE_PORT = parseInt(import.meta.env.VITE_PORT as string);
const VITE_PEOPLE_API_URL = parseInt(
  import.meta.env.VITE_PEOPLE_API_URL as string
);
const nodeEnv = VITE_NODE_ENV;
const port = VITE_PORT;
const server = {
  peopleApiBaseUrl: VITE_PEOPLE_API_URL,
};

export default {
  server,
  nodeEnv,
  port,
};
