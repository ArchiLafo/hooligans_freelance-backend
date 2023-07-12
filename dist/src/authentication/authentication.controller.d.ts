import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(registrationData: RegisterDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
    logIn(request: RequestWithUser, response: Response): Promise<import("express-serve-static-core").Response<any, Record<string, any>, number>>;
    logOut(request: RequestWithUser, response: Response): Promise<Response<any, Record<string, any>>>;
    authenticate(request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").Role;
        awatar: string;
    }, unknown> & {}>;
}
