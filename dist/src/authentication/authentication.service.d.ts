import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registrationData: RegisterDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        awatar: string;
    }, unknown> & {}>;
    getAuthenticatedUser(email: string, plainTextPassword: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: Role;
        awatar: string;
    }, unknown> & {}>;
    private verifyPassword;
    getCookieWithJwtToken(userId: number): Promise<string>;
    getCookieForLogOut(): Promise<string>;
}
