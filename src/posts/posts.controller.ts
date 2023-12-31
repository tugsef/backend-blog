import { ERole } from '@prisma/client';

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
import { PostsService } from './posts.service';
import { GetAllPosts, GetUserPost } from './dto/res';
import { CreatePost, UpdatePost } from './dto/req';
/*
@Postların yönetim panelidir
*/

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  //user id si belli olan kullanıcının bütün postlarını getirir.

  @Get(':id')
  @Roles(ERole.MODERATOR)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getUserPosts(@Param('id') id: number): Promise<GetUserPost[]> {
    return this.postsService.getUserPosts(id);
  }

  // Database de kayıtlı bütün postları getirir
  @Public()
  @Get()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getAllPosts(): Promise<GetAllPosts[]> {
    return this.postsService.getAllPosts();
  }

  // accent-token i geçerli olan kullanıcı postunu günceller
  @Post('update/:id')
  @ApiBearerAuth()
  @Roles(ERole.MODERATOR)
  @HttpCode(HttpStatus.OK)
  updatePostId(
    @Param('id') id: number,
    @Body() updateData: UpdatePost,
  ): Promise<boolean> {
    return this.postsService.updatePostId(id, updateData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(ERole.MODERATOR)
  @HttpCode(HttpStatus.OK)
  deletePost(@Param('id') id: number): Promise<boolean> {
    return this.postsService.deletePost(id);
  }

  @Post('addPost')
  @ApiBearerAuth()
  @Roles(ERole.MODERATOR)
  @HttpCode(HttpStatus.ACCEPTED)
  createPost(@Body() createPost: CreatePost): Promise<boolean> {
    return this.postsService.createPost(createPost);
  }
}
