// Decorator to apply the interceptor
import { UseInterceptors } from '@nestjs/common';
import { ServiceCatchInterceptor } from '../interceptor/service-catch.interceptor';

export function ServiceCatch() {
  return UseInterceptors(ServiceCatchInterceptor);
}
