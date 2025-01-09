import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const expressApp = app.getHttpAdapter().getInstance(); 
  expressApp.set('trust proxy', 1); 

  const config = new DocumentBuilder()
    .setTitle('Alarm Management')
    .setDescription('API documentation for alarm management system')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 



  const port = 3000;
  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
