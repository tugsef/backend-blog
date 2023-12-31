import { CreateCategory } from './dto/req/category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetCategory } from './dto/res/category.dto';
import { Message } from './dto/res';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    getCategories(): Promise<GetCategory[]>;
    deleteCategoryId(categoryId: number): Promise<Message>;
    createCategory(createCategory: CreateCategory): Promise<Message>;
}
