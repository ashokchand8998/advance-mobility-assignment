import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
  console.log("Server running on port " + process.env.PORT || 3001);
}
bootstrap();
