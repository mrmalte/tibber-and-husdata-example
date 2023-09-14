import * as dotenv from 'dotenv';

dotenv.config();

interface Environment extends NodeJS.ProcessEnv {
  TIBBER_API_KEY: string;
  H66_HTTP_ADDRESS: string;
  TIBBER_API_URL: string;
}

const getEnvironment = () => {
  const environment = process.env as Environment;
  return {
    tibberApiKey: environment.TIBBER_API_KEY,
    H66HttpAddress: environment.H66_HTTP_ADDRESS,
    TibberApiUrl: environment.TIBBER_API_URL,
  };
};

export const env = getEnvironment();
