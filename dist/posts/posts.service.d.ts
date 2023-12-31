import { CreatePost } from "./dto/req/createPost.dto";
import { Logger } from "@nestjs/common";
import { GetAllPosts, GetUserPost } from "./dto/res";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MessageService } from "../message/message.service";
import { UpdatePost } from "./dto/req";
export declare class PostsService {
    private prisma;
    private config;
    private message;
    logger: Logger;
    constructor(prisma: PrismaService, config: ConfigService, message: MessageService);
    getUserPosts(id: number): Promise<GetUserPost[]>;
    getAllPosts(): Promise<GetAllPosts[]>;
    updatePostId(id: number, updateData: UpdatePost): Promise<boolean>;
    deletePost(id: number): Promise<boolean>;
    createPost(createPost: CreatePost): Promise<boolean>;
}
