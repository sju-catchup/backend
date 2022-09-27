type IEnv = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
};