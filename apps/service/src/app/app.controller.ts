import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../auth/decorator/public.decorator';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { BaseController } from '../utils/base.controller';

@Controller()
export class AppController extends BaseController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly appService: AppService) {
    super();
  }

  @Get("health")
  @Public()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.http.pingCheck('nestjs', 'https://docs.nestjs.com')
    ]);
  }
}
