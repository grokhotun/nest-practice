import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function start() {
  const PORT = process.env.PORT || 8080;

  try {
    const app = await NestFactory.create(AppModule);
    const swagger = new DocumentBuilder()
      .setTitle('NestJS practice')
      .setDescription('Swagger documentation')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('/api/swagger', app, document);

    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT} port`);
    });
  } catch (error) {
    console.log(`Could not start server on ${PORT} port`);
  }
}

start();
