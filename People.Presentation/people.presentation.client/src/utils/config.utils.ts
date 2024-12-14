const VITE_NODE_ENVIRONMENT = import.meta.env.VITE_NODE_ENV as string;
const VITE_PEOPLE_API_ENDPOINT = import.meta.env.VITE_PEOPLE_API_ENDPOINT as string;
const VITE_PORT = parseInt(import.meta.env.VITE_PORT as string);

export const nodeEnv = VITE_NODE_ENVIRONMENT;
export const port = VITE_PORT;
export const peopleApiBaseUrl = VITE_PEOPLE_API_ENDPOINT;
