import { registerAs } from '@nestjs/config';

export const corsConfig = registerAs('cors', () => {
  return {
    allowedOrigins: process.env['ALLOWED_ORIGINS']
      ? process.env['ALLOWED_ORIGINS'].split(',').map((origin) => origin.trim())
      : ['http://localhost:3000'],
    methods: process.env['ALLOWED_METHODS']
      ? process.env['ALLOWED_METHODS'].split(',').map((method) => method.trim())
      : ['GET'],
    credentials: process.env['ALLOW_CREDENTIALS'] ?? (false as boolean),
  };
});
