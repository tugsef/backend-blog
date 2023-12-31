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
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const guards_1 = require("./common/guards");
const message_module_1 = require("./message/message.module");
const posts_module_1 = require("./posts/posts.module");
const moderator_module_1 = require("./moderator/moderator.module");
const categories_controller_1 = require("./categories/categories.controller");
const categories_service_1 = require("./categories/categories.service");
const categories_module_1 = require("./categories/categories.module");
const logger_middleware_1 = require("./utils/logger.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            message_module_1.MessageModule,
            posts_module_1.PostsModule,
            moderator_module_1.ModeratorModule,
            categories_module_1.CategoriesModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.RolesGuard,
            },
            categories_service_1.CategoriesService,
        ],
        controllers: [categories_controller_1.CategoriesController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map