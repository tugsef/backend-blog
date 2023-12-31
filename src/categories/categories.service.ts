import { CreateCategory } from './dto/req/category.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetCategory } from './dto/res/category.dto';
import { Message } from './dto/res';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async getCategories(): Promise<GetCategory[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async deleteCategoryId(categoryId: number): Promise<Message> {
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

  async createCategory(createCategory: CreateCategory): Promise<Message> {
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
}
