import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Kodevy-Core API')
    .setDescription('API Documentation for Kodevy Backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header'
      },
      'JWT-auth' // Name for the security
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at /api-docs
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true // Keeps JWT auth after page refresh
    }
  });

  // Expose the JSON spec at /swagger-json
  app.getHttpAdapter().get("/api/v1/swagger-json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(document);
  });
  // Generate Postman collection and save it
  // const fs = require('fs');
  // fs.writeFileSync('./postman-collection.json', JSON.stringify(document, null, 2));

};
