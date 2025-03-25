// src/config/cors.config.ts
import { ConfigService } from '@nestjs/config';

export const corsConfig = (configService: ConfigService) => ({
  origin: configService
    ?.get<string>('ALLOWED_ORIGINS')
    ?.split(',')
    .map((origin) => origin.trim()) ?? ['http://localhost:3000'],
  methods: configService
    ?.get<string>('ALLOWED_METHODS')
    ?.split(',')
    .map((method) => method.trim()) ?? ['GET'],
  credentials: configService.get<boolean>('ALLOW_CREDENTIALS') === true, // Boolean conversion
});
