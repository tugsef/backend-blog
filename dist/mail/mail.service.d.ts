import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../auth/dto/req/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private mailerService;
    private config;
    constructor(mailerService: MailerService, config: ConfigService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
}
