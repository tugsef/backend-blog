import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtModule } from '@nestjs/jwt';
import { MessageService } from '../message/message.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PostsController],
  providers: [PostsService, MessageService],
})
export class PostsModule {}
