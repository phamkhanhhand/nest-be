import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enable CORS for the frontend application running on http://localhost:3000
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
   


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field thừa
      forbidNonWhitelisted: true, // báo lỗi nếu có field lạ
      transform: true, // auto convert type (string → number)
    }),
  );

  console.log(`App running on http://localhost:${port}`);
}
bootstrap();
