import { Category } from '@prisma/client';

export class GetAllPosts {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  published: boolean;
  authorId: number;
  approve: number;
  hashtag: string;
  story: string;
  authorUserName: string;
  categories: Category[];
}
