import { Post, Profile } from '@prisma/client';
export declare class GetUserProfile {
    id: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    posts: Post[];
    profile: Profile;
}
