import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

// ✅ Feature Modules
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ModelTransformerModule } from '../model-transformer/model-transformer.module';

// ✅ Configuration Files

// ✅ Global Guards & Filters
import { ThrottlerGuard } from '@nestjs/throttler';
import {
  corsConfig,
  HttpExceptionFilter,
  JwtAuthGuard,
  jwtConfig,
  ResponseInterceptor,
  RolesGuard,
  throttleConfig,
  WinstonConfig,
} from '@shared/server';

// ✅ Global Interceptors

@Module({
  imports: [
    // ✅ Global Configuration Module Setup
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
      load: [
        corsConfig,
        throttleConfig,
        jwtConfig({
          algorithm: 'HS256', // Custom property
          audience: 'my-app', // Another new property
        }),
      ],
    }),

    // ✅ Configure ThrottlerModule with ConfigService
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('throttle.ttl'),
          limit: config.get('throttle.limit'),
        },
      ],
    }),

    // ✅ MongoDB Configuration
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGO_URI'),
        };
      },
      inject: [ConfigService],
    }),

    // ✅ External Modules
    HttpModule, // For making external HTTP calls
    TerminusModule, // For Health Checks

    // ✅ Application Feature Modules
    AuthModule,
    UserModule,
    ModelTransformerModule,
  ],
  controllers: [AppController],
  providers: [
    WinstonConfig,
    // ✅ Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    // ✅ Global Guards (Order Matters)
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Auth Guard for JWT validation
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Role-based Access Control (RBAC)
    },

    // ✅ Global Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // ✅ Application Service
    AppService,
  ],
})
export class AppModule {}
