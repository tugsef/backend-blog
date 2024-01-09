"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Your API Title")
        .setDescription("Your API description")
        .addBearerAuth()
        .setVersion("1.0.0")
        .addBearerAuth(undefined, "defaultBearerAuth")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        origin: corsOrigin,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });
    await app.listen(process.env.PORT || 3001);
}
bootstrap();
//# sourceMappingURL=main.js.map