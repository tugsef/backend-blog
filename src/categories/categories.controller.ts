import { CategoriesService } from './categories.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '../common/decorators';
import { GetCategory, Message } from './dto/res';
import { CreateCategory } from './dto/req';
import { ERole } from '@prisma/client';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Public()
  @Get()
  getCategories(): Promise<GetCategory[]> {
    return this.categoriesService.getCategories();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(ERole.ADMIN)
  deleteCategoryId(@Param('id') categoryId: number): Promise<Message> {
    return this.categoriesService.deleteCategoryId(categoryId);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Roles(ERole.ADMIN)
  createCategory(@Body() createCategory: CreateCategory): Promise<Message> {
    return this.categoriesService.createCategory(createCategory);
  }
}
