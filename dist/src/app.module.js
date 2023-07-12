"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const authentication_module_1 = require("./authentication/authentication.module");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const users_module_1 = require("./users/users.module");
const product_controller_1 = require("./product/product.controller");
const product_module_1 = require("./product/product.module");
const moderation_service_1 = require("./moderation/moderation.service");
const moderation_controller_1 = require("./moderation/moderation.controller");
const moderation_module_1 = require("./moderation/moderation.module");
const files_service_1 = require("./files/files.service");
const files_controller_1 = require("./files/files.controller");
const plan_module_1 = require("./plan/plan.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            authentication_module_1.AuthenticationModule,
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRATION_TIME: Joi.string().required(),
                }),
            }),
            product_module_1.ProductModule,
            moderation_module_1.ModerationModule,
            plan_module_1.PlanModule,
        ],
        controllers: [app_controller_1.AppController, product_controller_1.ProductController, moderation_controller_1.ModerationController, files_controller_1.FilesController],
        providers: [app_service_1.AppService, moderation_service_1.ModerationService, files_service_1.FilesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map