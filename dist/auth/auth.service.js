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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const EXPIRE_TIME = 20 * 1000;
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signupLocal(dto) {
        const hash = await argon.hash(dto.password);
        const roleData = dto.roles.length === 0 || undefined
            ? {
                role: client_1.ERole.USER,
            }
            : dto.roles?.map((rol) => {
                switch (rol.toLowerCase()) {
                    case "ADMIN":
                        return {
                            role: client_1.ERole.ADMIN,
                        };
                    case "MODERATOR":
                        return {
                            role: client_1.ERole.MODERATOR,
                        };
                    default:
                        return {
                            role: client_1.ERole.USER,
                        };
                }
            });
        await this.prisma.user
            .create({
            data: {
                email: dto.email,
                roles: {
                    create: roleData,
                },
                hash,
            },
        })
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            throw error;
        });
        this.logger.log(`${dto.email} kullanıcı oluşturuldu.`);
    }
    async signinLocal(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
            include: {
                roles: true,
            },
        }).catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            throw error;
        });
        ;
        if (!user)
            throw new common_1.ForbiddenException("Access Denied");
        const passwordMatches = await argon.verify(user.hash, dto.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException("Access Denied");
        const tokens = await this.getTokens(user.id, user.roles, user.email);
        await this.updateRtHash(user.id, tokens.backendTokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        await this.prisma.user
            .updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        })
            .catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                this.logger.error(error);
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            this.logger.error(error);
            throw error;
        });
        this.logger.log(`${userId} client close`);
        return true;
    }
    async getUserProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                profile: true,
                posts: {
                    include: {
                        categories: true,
                    },
                },
            },
        });
        return {
            id: user.id,
            userName: user.userName,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            posts: user.posts,
            profile: user.profile,
        };
    }
    async refreshTokens(userId, rt) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                roles: true,
            },
        }).catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                this.logger.error(error);
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            this.logger.error(error);
            throw error;
        });
        ;
        if (!user || !user.hashedRt)
            throw new common_1.ForbiddenException("Access Denied");
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches)
            throw new common_1.ForbiddenException("Access Denied");
        const tokens = await this.getTokens(user.id, user.roles, user.email);
        await this.updateRtHash(user.id, tokens.backendTokens.refreshToken);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        }).catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                this.logger.error(error);
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            this.logger.error(error);
            throw error;
        });
        ;
    }
    async getTokens(userId, roleDate, email) {
        const jwtPayload = {
            sub: userId,
            roles: roleDate,
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get("AT_SECRET"),
                expiresIn: "15m",
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get("RT_SECRET"),
                expiresIn: "7d",
            }),
        ]);
        return {
            user: {
                id: userId,
                email: email,
                name: ""
            },
            backendTokens: {
                accessToken: at,
                refreshToken: rt,
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            }
        };
    }
    async deleteAuth(userId) {
        const deleteRoles = this.prisma.role.deleteMany({
            where: {
                userId: Number(userId),
            },
        });
        const deletePosts = this.prisma.post.deleteMany({
            where: {
                authorId: Number(userId),
            },
        });
        const deleteUser = this.prisma.user.deleteMany({
            where: {
                id: Number(userId),
            },
        });
        const deleteProfile = this.prisma.profile.deleteMany({
            where: {
                userId: Number(userId),
            },
        });
        await this.prisma.$transaction([
            deletePosts,
            deleteRoles,
            deleteUser,
            deleteProfile,
        ]).catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                this.logger.error(error);
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            this.logger.error(error);
            throw error;
        });
        return true;
    }
    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            include: {
                roles: true,
            },
        }).catch((error) => {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                this.logger.error(error);
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            this.logger.error(error);
            throw error;
        });
        ;
        const allUser = users?.map((user) => {
            return {
                id: user.id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
            };
        });
        return allUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map