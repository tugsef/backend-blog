import { Category } from '@prisma/client';
export declare class GetUserPost {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    published: boolean;
    authorId: number;
    approve: number;
    hashtag: string;
    story: string;
    categories: Category[];
}
