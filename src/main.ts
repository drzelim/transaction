import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { kafkaOptionsFactory } from './config/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get('HTTP_PREFIX') ?? 'api');

  // установка соединения с Kafka
  app.connectMicroservice<MicroserviceOptions>(kafkaOptionsFactory());

  // настройка Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle(`${config.get('SERVICE_NAME')} microservice`)
    .setDescription('API Documentation')
    .addServer(
      `/${config.get('HTTP_HOST')}:${config.get('HTTP_PORT')}${config.get('HTTP_PREFIX')}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app as any, configSwagger);
  SwaggerModule.setup(
    `${config.get('HTTP_PREFIX')}/docs`,
    app as any,
    document,
  );

  // подписка на брокер сообщений
  await app.startAllMicroservices();
  await app.listen(config.get('HTTP_PORT') ?? 3000);
}
bootstrap();
