"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorModule = void 0;
const common_1 = require("@nestjs/common");
const moderator_service_1 = require("./moderator.service");
const moderator_controller_1 = require("./moderator.controller");
const jwt_1 = require("@nestjs/jwt");
let ModeratorModule = class ModeratorModule {
};
exports.ModeratorModule = ModeratorModule;
exports.ModeratorModule = ModeratorModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        providers: [moderator_service_1.ModeratorService],
        controllers: [moderator_controller_1.ModeratorController],
    })
], ModeratorModule);
//# sourceMappingURL=moderator.module.js.map