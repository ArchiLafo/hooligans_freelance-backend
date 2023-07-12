import { ModerationService } from './moderation.service';
export declare class ModerationController {
    private readonly moderationService;
    constructor(moderationService: ModerationService);
    publish(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        places: string;
        category: string;
        duration: string;
        title: string;
        cost: string;
        description: string;
        authorId: number;
        isPublished: boolean;
    }, unknown> & {}>;
}
