import { Role } from '@prisma/client';

export class GetAllUsers {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}
