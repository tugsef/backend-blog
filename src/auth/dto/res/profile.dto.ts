import { Post, Profile } from '@prisma/client';

export class GetUserProfile {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  posts: Post[];
  profile: Profile;
}
