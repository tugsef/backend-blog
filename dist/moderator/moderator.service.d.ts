import { PrismaService } from '../prisma/prisma.service';
import { UpdateModerator } from './dto/req';
export declare class ModeratorService {
    private prisma;
    constructor(prisma: PrismaService);
    moderatorUpdate(userId: number, updateModerator: UpdateModerator): Promise<boolean>;
}
