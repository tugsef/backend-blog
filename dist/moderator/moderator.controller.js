"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorController = void 0;
const common_1 = require("@nestjs/common");
const moderator_service_1 = require("./moderator.service");
const decorators_1 = require("../common/decorators");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const req_1 = require("./dto/req");
let ModeratorController = class ModeratorController {
    constructor(modService) {
        this.modService = modService;
    }
    moderatorUpdate(userId, updateModerator) {
        return this.modService.moderatorUpdate(userId, updateModerator);
    }
};
exports.ModeratorController = ModeratorController;
__decorate([
    (0, common_1.Post)(),
    (0, decorators_1.Roles)(client_1.ERole.MODERATOR),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorators_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, req_1.UpdateModerator]),
    __metadata("design:returntype", Promise)
], ModeratorController.prototype, "moderatorUpdate", null);
exports.ModeratorController = ModeratorController = __decorate([
    (0, swagger_1.ApiTags)('moderator'),
    (0, common_1.Controller)('moderator'),
    __metadata("design:paramtypes", [moderator_service_1.ModeratorService])
], ModeratorController);
//# sourceMappingURL=moderator.controller.js.map