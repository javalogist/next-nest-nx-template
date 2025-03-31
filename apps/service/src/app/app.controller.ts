import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { BaseController, Public } from '@shared/server';
import { ApiResponse } from '@shared/common';

@Controller()
export class AppController extends BaseController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
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
    return ApiResponse.success(data, 'Health check completed successfully');
  }
}
