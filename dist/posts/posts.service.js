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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger();
    }
    async getUserPosts(id) {
        const postData = await this.prisma.post.findMany({
            where: {
                authorId: Number(id),
            },
            include: {
                categories: true,
            },
        });
        console.log(postData);
        return postData;
    }
    async getAllPosts() {
        const postData = await this.prisma.post.findMany({
            include: {
                author: true,
                categories: true,
            },
        });
        const allPosts = postData.map((post) => {
            return {
                id: post.id,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                title: post.title,
                published: post.published,
                authorId: post.authorId,
                approve: post.approve,
                hashtag: post.hashtag,
                story: post.story,
                authorUserName: post.author.userName,
                categories: post.categories,
            };
        });
        this.logger.log("Posts sent");
        return allPosts;
    }
    async updatePostId(id, updateData) {
        console.log(updateData);
        await this.prisma.post
            .update({
            where: {
                id: Number(id),
            },
            data: {
                updatedAt: updateData.updatedAt,
                title: updateData?.title,
                published: updateData.published,
                authorId: updateData.authorId,
                approve: updateData?.approve,
                hashtag: updateData?.hashtag,
                story: updateData?.story,
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
        return true;
    }
    async deletePost(id) {
        await this.prisma.post
            .delete({
            where: {
                id: Number(id),
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
        return true;
    }
    async createPost(createPost) {
        const postData = createPost.categories?.map((ctgryId) => {
            return { id: ctgryId };
        });
        await this.prisma.post
            .create({
            data: {
                title: createPost.title,
                published: createPost.published,
                authorId: createPost.authorId,
                approve: createPost.approve,
                hashtag: createPost.hashtag,
                story: createPost.story,
                categories: {
                    connect: postData,
                },
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
        return true;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map