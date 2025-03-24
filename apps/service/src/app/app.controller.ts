import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { BaseController, Public, SuccessResponse } from '@shared/server';

@Controller()
export class AppController extends BaseController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly appService: AppService
  ) {
    super();
  }

  @Get('health')
  @Public()
  @HealthCheck()
  async checkHealth() {
    const data = await this.healthCheckService.check([
      () => this.http.pingCheck('nestjs', 'https://docs.nestjs.com'),
    ]);
    return new SuccessResponse(data, 'Health check completed successfully');
  }
}
