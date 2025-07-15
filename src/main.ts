import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS để cho phép frontend gọi API
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
