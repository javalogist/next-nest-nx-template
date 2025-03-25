import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttleConfig = (
  configService: ConfigService,
): ThrottlerModuleOptions => ({
  throttlers: [
    {
      ttl: configService.get<number>('THROTTLE_TTL', 60), // Time in seconds
      limit: configService.get<number>('THROTTLE_LIMIT', 10), // Max requests allowed
    },
  ],
});
