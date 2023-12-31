import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
