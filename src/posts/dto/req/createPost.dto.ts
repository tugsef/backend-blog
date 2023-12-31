import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePost {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  published: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty()
  @IsNumber()
  approve: number;

  @ApiProperty()
  hashtag: string;

  @ApiProperty()
  story: string;

  @ApiProperty()
  categories: number[];
}
