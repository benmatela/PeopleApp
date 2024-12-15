const VITE_NODE_ENVIRONMENT = import.meta.env.VITE_NODE_ENV as string;
const VITE_PEOPLE_API_URL = import.meta.env.VITE_PEOPLE_API_URL as string;
const VITE_PORT = parseInt(import.meta.env.VITE_PORT as string);
const nodeEnv = VITE_NODE_ENVIRONMENT;
const port = VITE_PORT;
const server = {
  peopleApiBaseUrl: VITE_PEOPLE_API_URL,
};

export default {
  server,
  nodeEnv,
  port
};
