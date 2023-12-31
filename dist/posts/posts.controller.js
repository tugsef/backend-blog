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
exports.PostsController = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/decorators");
const posts_service_1 = require("./posts.service");
const req_1 = require("./dto/req");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    getUserPosts(id) {
        return this.postsService.getUserPosts(id);
    }
    getAllPosts() {
        return this.postsService.getAllPosts();
    }
    updatePostId(id, updateData) {
        return this.postsService.updatePostId(id, updateData);
    }
    deletePost(id) {
        return this.postsService.deletePost(id);
    }
    createPost(createPost) {
        return this.postsService.createPost(createPost);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorators_1.Roles)(client_1.ERole.MODERATOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getUserPosts", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(client_1.ERole.MODERATOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, req_1.UpdatePost]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePostId", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(client_1.ERole.MODERATOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('addPost'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(client_1.ERole.MODERATOR),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [req_1.CreatePost]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map