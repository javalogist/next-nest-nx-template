// src/config/jwt.config.ts
import { ConfigService } from '@nestjs/config';

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET', 'default-secret'),
  expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
  algorithm: configService.get<string>('JWT_ALGORITHM', 'HS256'),
  audience: configService.get<string>('APP_NAME', 'my-app'),
});
