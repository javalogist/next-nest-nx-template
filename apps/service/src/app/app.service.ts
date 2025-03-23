import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getData(): { message: string; info: string } {
    return {
      message: 'Health check completed successfully',
      info: `${this.configService.get<boolean>('DEBUG')} ${
        process.env.NODE_ENV
      }`,
    };
  }
}
