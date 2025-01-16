import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth,Blogs Swagger')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addApiKey({
      type: "apiKey",
      name: "Authorization",
      in: "header", 
      description: "Enter your token" 
    }, 'X-AUTH-TOKEN')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
