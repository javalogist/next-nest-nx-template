import { registerAs } from '@nestjs/config';

export const jwtConfig = (overrides?: Partial<Record<string, any>>) => {
  return registerAs('jwt', () => ({
    secret: process.env['JWT_SECRET'] || 'default-secret',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '1d',
    ...overrides, // Allow overriding or adding new properties
  }));
};
