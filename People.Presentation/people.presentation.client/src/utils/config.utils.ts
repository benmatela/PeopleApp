const NODE_ENVIRONMENT = import.meta.env.VITE_NODE_ENV as string;
const VITE_PEOPLE_API_ENDPOINT = import.meta.env.VITE_PEOPLE_API_ENDPOINT as string;

export const nodeEnv = NODE_ENVIRONMENT;
export const peopleApiBaseUrl = VITE_PEOPLE_API_ENDPOINT;
