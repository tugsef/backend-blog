import { CategoriesService } from './categories.service';
import { GetCategory, Message } from './dto/res';
import { CreateCategory } from './dto/req';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<GetCategory[]>;
    deleteCategoryId(categoryId: number): Promise<Message>;
    createCategory(createCategory: CreateCategory): Promise<Message>;
}
