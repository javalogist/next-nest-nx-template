import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator
} from '@nestjs/terminus';
import { ApiResponse, BaseController, Public } from '@shared/server';

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
      () => this.http.pingCheck('nestjs', 'https://docs.nestjs.com')
    ]);
    return ApiResponse.success(data, 'Health check completed successfully');
  }
}
