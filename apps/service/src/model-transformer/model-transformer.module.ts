import { Module } from '@nestjs/common';
import { ModelTransformerController } from './model-transformer.controller';
import { ModelTransformerService } from './model-transformer.service';

@Module({
  controllers: [ModelTransformerController],
  providers: [ModelTransformerService],
})
export class ModelTransformerModule {}
