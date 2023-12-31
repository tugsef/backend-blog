import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNumber } from 'class-validator';

export class UpdatePost {
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  @IsEmpty()
  @IsNumber()
  authorId: number;

  @ApiProperty()
  @IsNumber()
  approve: number;

  @ApiProperty()
  hashtag: string;

  @ApiProperty()
  story: string;
}
