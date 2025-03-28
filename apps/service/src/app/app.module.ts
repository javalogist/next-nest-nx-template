import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { ThrottlerGuard } from '@nestjs/throttler';
import {
  JwtAuthGuard,
  mongoConfig,
  RequestLoggerMiddleware,
  RolesGuard,
  throttleConfig,
  WinstonConfig
} from '@shared/server';

// ✅ Global Interceptors

@Module({
  imports: [
    // ✅ Global Configuration Module Setup
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
    }),

    // ✅ Configure ThrottlerModule with ConfigService
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        throttleConfig(configService)
    }),

    // ✅ MongoDB Configuration
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        mongoConfig(configService)
    }),


    /**
     * ✅ External Modules
     */
    HttpModule, // For making external HTTP calls
    TerminusModule, // For Health Checks

    /**
     * ✅ Application Feature Modules
     */
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    WinstonConfig,
    // ✅ Global Guards (Order Matters)
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard //For Rate limiting
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard // Auth Guard for JWT validation
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard // Role-based Access Control (RBAC)
    },

    // ✅ Application Service
    AppService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({
      path: '/api/*path', // ✅ Correct wildcard usage
      method: RequestMethod.ALL
    });
  }
}
