import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  port: process.env.REST_API_PORT,
  globalPrefix: process.env.REST_API_GLOBAL_PREFIX,
}));
