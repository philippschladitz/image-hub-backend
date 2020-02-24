import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seed } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const toSeed = process.argv[2];
  if (toSeed) {
    await seed(app);
  }

  await app.listen(3000);
}
bootstrap();
