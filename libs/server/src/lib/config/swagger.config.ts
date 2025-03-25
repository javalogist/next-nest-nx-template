import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const setupSwagger = (
  app: INestApplication,
  configService: ConfigService
) => {
  const appName = configService.get<string>('APP_NAME', 'my-app');
  const version = configService.get<string>('API_VERSION', '1');
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`Swagger API Documentation for ${appName}`)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT-auth' // Name for the security
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at /api-docs
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps JWT auth after page refresh
    },
  });

  // Expose the JSON spec at /swagger-json
  app.getHttpAdapter().get('/api/v1/swagger-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });
};
