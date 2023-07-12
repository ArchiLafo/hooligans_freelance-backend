"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: { origin: "http://localhost:8081", credentials: true } });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('[HTTPS Hooligans] Документация проекта')
        .setDescription('Здесь собраны все энд-поинты проекта. Я максимально подробно все описал, чтобы вам было приятно работать с серверной частью проекта. Удачи вам, дорогие фронт-эндеры. С любовью, Кирилл')
        .setVersion('0.4')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map