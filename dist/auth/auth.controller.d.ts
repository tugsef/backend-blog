import { AuthService } from './auth.service';
import { GetAllUsers } from './dto/res';
import { LoginAuthDto } from './dto/req/login.dto';
import { GetUserProfile } from './dto/res/profile.dto';
import { AuthDto } from './dto/req';
import { Tokens } from './types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(dto: AuthDto): Promise<any>;
    signinLocal(dto: LoginAuthDto): Promise<Tokens>;
    logout(userId: number): Promise<boolean>;
    getUserProfile(userId: number): Promise<GetUserProfile>;
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
    deleteAuth(userId: number): Promise<boolean>;
    getAllUsers(): Promise<GetAllUsers[]>;
}
