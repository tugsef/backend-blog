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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCategories() {
        const categories = await this.prisma.category.findMany();
        return categories;
    }
    async deleteCategoryId(categoryId) {
        const categories = await this.prisma.category.findMany({
            where: {
                id: Number(categoryId),
            },
            include: {
                _count: {
                    select: { posts: true },
                },
            },
        });
        const postToCategoryCount = categories?.map((ct) => ct._count?.posts);
        if (postToCategoryCount[0] <= 0) {
            await this.prisma.category.delete({
                where: {
                    id: Number(categoryId),
                },
            });
            return { message: 'Category deleted' };
        }
        return { message: 'There are other posts in the category' };
    }
    async createCategory(createCategory) {
        const existsCategory = await this.prisma.category.findMany({
            where: {
                name: createCategory.name.toUpperCase(),
            },
        });
        if (existsCategory.length <= 0 || undefined) {
            await this.prisma.category.create({
                data: {
                    name: createCategory.name.toUpperCase(),
                },
            });
            return { message: 'Category created' };
        }
        return { message: 'Exists Category' };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map