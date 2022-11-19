import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 1000 }));
  app.enableCors();
  app.useStaticAssets(join(__dirname,"..","public"));
  await app.listen(port,() => {
    console.log("started at ",port);
  });
}
bootstrap();
