import { ERole } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  Public,
  GetCurrentUserId,
  GetCurrentUser,
  Roles,
} from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { GetAllUsers } from './dto/res';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/req/login.dto';
import { GetUserProfile } from './dto/res/profile.dto';
import { AuthDto } from './dto/req';
import { Tokens } from './types';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<any> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: LoginAuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Get('profile')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getUserProfile(@GetCurrentUserId() userId: number): Promise<GetUserProfile> {
    return this.authService.getUserProfile(userId);
  }

  @Public()
  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Delete()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  deleteAuth(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.deleteAuth(userId);
  }

  @Get('getAllUser')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Roles(ERole.MODERATOR)
  getAllUsers(): Promise<GetAllUsers[]> {
    return this.authService.getAllUsers();
  }
}
