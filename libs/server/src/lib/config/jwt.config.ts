import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET', 'default-secret'), // ✅ Correctly read secret
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1d'),
    audience: configService.get<string>('APP_NAME', 'my-app'), // Optional
  },
});
