import { ERole } from '@prisma/client';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: ERole[]) => import("@nestjs/common").CustomDecorator<string>;
