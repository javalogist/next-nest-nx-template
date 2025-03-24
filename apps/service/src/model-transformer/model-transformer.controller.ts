import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { ModelTransformerService } from './model-transformer.service';
import { BaseController } from '@shared/server';

@Controller('model-transformer')
export class ModelTransformerController extends BaseController {
  constructor(
    private readonly modelTransformerService: ModelTransformerService
  ) {
    super();
  }

  @Get('languages')
  async getLanguages(@Res() res: Response) {
    const languages = this.modelTransformerService.getAvailableLanguages();
    return res.json(languages);
  }

  @Post()
  async convertSchema(@Body() body: any, @Res() res: Response) {
    const { schema, from, to } = body;

    if (!schema || !from || !to) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Schema, from, and to fields are required!'
      });
    }

    if (from === to) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'From and To language cannot be same'
      });
    }

    try {
      console.log(`Converting from ${from} to ${to}`);
      const result = this.modelTransformerService.convert(schema, from, to);
      return res.json({ models: result });
    } catch (error) {
      return res.status(400).json({
        error: 'Conversion Error',
        message: error.message
      });
    }
  }
}
