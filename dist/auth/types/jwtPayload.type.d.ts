import { Role } from '@prisma/client';
export type JwtPayload = {
    email: string;
    roles: Role[];
    sub: number;
};
