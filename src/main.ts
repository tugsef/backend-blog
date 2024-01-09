import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

  const options = new DocumentBuilder()
    .setTitle("Your API Title")
    .setDescription("Your API description")
    .addBearerAuth()
    .setVersion("1.0.0")
    .addBearerAuth(undefined, "defaultBearerAuth")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);

}
bootstrap();
