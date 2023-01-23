import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

async function start() {
  const PORT = process.env.PORT || 8080;

  try {
    const app = await NestFactory.create(AppModule);

    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT} port`);
    });
  } catch (error) {
    console.log(`Could not start server on ${PORT} port`);
  }
}

start();
