import { log } from "console";
import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";

import { GetAllUsers } from "./dto/res";
import { JwtPayload, Tokens } from "./types";
import { ERole, Prisma, Role } from "@prisma/client";
import { LoginAuthDto } from "./dto/req/login.dto";
import { GetUserProfile } from "./dto/res/profile.dto";
import { AuthDto } from "./dto/req";
const EXPIRE_TIME = 20 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<any> {
    const hash = await argon.hash(dto.password);
    const roleData =
      dto.roles.length === 0 || undefined
        ? {
            role: ERole.USER,
          }
        : dto.roles?.map((rol) => {
            switch (rol.toLowerCase()) {
              case "ADMIN":
                return {
                  role: ERole.ADMIN,
                };
              case "MODERATOR":
                return {
                  role: ERole.MODERATOR,
                };
              default:
                return {
                  role: ERole.USER,
                };
            }
          });

    await this.prisma.user
      .create({
        data: {
          email: dto.email,
          roles: {
            create: roleData,
          },
          hash,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });
    this.logger.log(`${dto.email} kullanıcı oluşturuldu.`);
  }

  async signinLocal(dto: LoginAuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        roles: true,
      },
    })  .catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials incorrect");
        }
      }
      throw error;
    });;

    if (!user) throw new ForbiddenException("Access Denied");

    const passwordMatches = await argon.verify(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.id, user.roles, user.email);
    await this.updateRtHash(user.id, tokens.backendTokens.refreshToken);

    return tokens;
  }
  async logout(userId: number): Promise<boolean> {
    await this.prisma.user
      .updateMany({
        where: {
          id: userId,
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          this.logger.error(error)
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        this.logger.error(error)
        throw error;
      });
      this.logger.log(`${userId} client close`)
    return true;
  }
  async getUserProfile(userId: number): Promise<GetUserProfile> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
        posts: {
          include: {
            categories: true,
          },
        },
      },
    });
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      posts: user.posts,
      profile: user.profile,
    };
  }
  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: true,
      },
    }).catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.error(error)
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials incorrect");
        }
      }
      this.logger.error(error)
      throw error;
    });;
    if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied");

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user.id, user.roles, user.email);
    await this.updateRtHash(user.id, tokens.backendTokens.refreshToken);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    }).catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.error(error)
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials incorrect");
        }
      }
      this.logger.error(error)
      throw error;
    });;
  }

  async getTokens(
    userId: number,
    roleDate: Role[],
    email: string
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      roles: roleDate,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: "7d",
      }),
    ]);

    return {

      user:{
        id:userId,
        email:email,
        name:""
      },
      backendTokens:{
          accessToken:at,
          refreshToken:rt,
          expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      }
   
    };
  }

  async deleteAuth(userId: number) {
    const deleteRoles = this.prisma.role.deleteMany({
      where: {
        userId: Number(userId),
      },
    });

    const deletePosts = this.prisma.post.deleteMany({
      where: {
        authorId: Number(userId),
      },
    });

    const deleteUser = this.prisma.user.deleteMany({
      where: {
        id: Number(userId),
      },
    });
    const deleteProfile = this.prisma.profile.deleteMany({
      where: {
        userId: Number(userId),
      },
    });
    await this.prisma.$transaction([
      deletePosts,
      deleteRoles,
      deleteUser,
      deleteProfile,
    ]).catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.error(error)
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials incorrect");
        }
      }
      this.logger.error(error)
      throw error;
    });
    return true;
  }

  async getAllUsers(): Promise<GetAllUsers[]> {
    const users = await this.prisma.user.findMany({
      include: {
        roles: true,
      },
    }).catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.logger.error(error)
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials incorrect");
        }
      }
      this.logger.error(error)
      throw error;
    });;

    const allUser = users?.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      };
    });
    return allUser;
  }
}
