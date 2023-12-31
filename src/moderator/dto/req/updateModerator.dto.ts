import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class UpdateModerator {
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmpty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  profileBio: string;
}
