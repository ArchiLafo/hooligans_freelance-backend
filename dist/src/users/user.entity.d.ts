import { Role } from '@prisma/client';
declare class User {
    id?: number;
    email: string;
    name: string;
    password: string;
    role: Role;
}
export default User;
