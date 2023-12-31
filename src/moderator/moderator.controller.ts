import { Controller, Post } from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { GetCurrentUser, Roles } from '../common/decorators';
import { ERole } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateModerator } from './dto/req';

@ApiTags('moderator')
@Controller('moderator')
export class ModeratorController {
  constructor(private modService: ModeratorService) {}

  @Post()
  @Roles(ERole.MODERATOR)
  @ApiBearerAuth()
  moderatorUpdate(
    @GetCurrentUser() userId: number,
    updateModerator: UpdateModerator,
  ): Promise<boolean> {
    return this.modService.moderatorUpdate(userId, updateModerator);
  }
}
