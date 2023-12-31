import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UpdateModerator } from './dto/req';
import { Prisma } from '@prisma/client';

@Injectable()
export class ModeratorService {
  constructor(private prisma: PrismaService) {}
  async moderatorUpdate(
    userId: number,
    updateModerator: UpdateModerator,
  ): Promise<boolean> {
    await this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          updatedAt: updateModerator.updatedAt,
          userName: updateModerator.userName,
          email: updateModerator.email,
          firstName: updateModerator.firstName,
          lastName: updateModerator.lastName,
          profile: {
            update: { bio: updateModerator.profileBio },
          },
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });
    return true;
  }
}
