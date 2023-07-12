import { Role } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    name: string;
    password: string;
    role: Role;
}
export default CreateUserDto;
