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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeratorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ModeratorService = class ModeratorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async moderatorUpdate(userId, updateModerator) {
        await this.prisma.user
            .update({
            where: {
                id: userId,
            },
            data: {
                updatedAt: updateModerator.updatedAt,
                userName: updateModerator.userName,
                email: updateModerator.email,
                firstName: updateModerator.firstName,
                lastName: updateModerator.lastName,
                profile: {
                    update: { bio: updateModerator.profileBio },
                },
            },
        })
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials incorrect');
                }
            }
            throw error;
        });
        return true;
    }
};
exports.ModeratorService = ModeratorService;
exports.ModeratorService = ModeratorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModeratorService);
//# sourceMappingURL=moderator.service.js.map