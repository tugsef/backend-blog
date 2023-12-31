import { ModeratorService } from './moderator.service';
import { UpdateModerator } from './dto/req';
export declare class ModeratorController {
    private modService;
    constructor(modService: ModeratorService);
    moderatorUpdate(userId: number, updateModerator: UpdateModerator): Promise<boolean>;
}
