import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { GetAllUsers } from "./dto/res";
import { Tokens } from "./types";
import { Role } from "@prisma/client";
import { LoginAuthDto } from "./dto/req/login.dto";
import { GetUserProfile } from "./dto/res/profile.dto";
import { AuthDto } from "./dto/req";
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    signupLocal(dto: AuthDto): Promise<any>;
    signinLocal(dto: LoginAuthDto): Promise<Tokens>;
    logout(userId: number): Promise<boolean>;
    getUserProfile(userId: number): Promise<GetUserProfile>;
    refreshTokens(userId: number, rt: string): Promise<Tokens>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, roleDate: Role[], email: string): Promise<Tokens>;
    deleteAuth(userId: number): Promise<boolean>;
    getAllUsers(): Promise<GetAllUsers[]>;
}
