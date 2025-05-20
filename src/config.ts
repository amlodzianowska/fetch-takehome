const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://frontend-take-home-service.fetch.com";

const config = {
  api: {
    baseUrl: API_URL,
    endpoints: {
      auth: {
        login: "/auth/login",
        logout: "/auth/logout",
      },
      dogs: {
        breeds: "/dogs/breeds",
        search: "/dogs/search",
        byIds: "/dogs",
      },
    },
  },
};

export const getApiUrl = (endpointPath: string): string => {
  const normalizedPath = endpointPath.startsWith("/")
    ? endpointPath
    : `/${endpointPath}`;
  return `${config.api.baseUrl}${normalizedPath}`;
};

export default config;
