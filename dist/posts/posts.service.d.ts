import { CreatePost } from "./dto/req/createPost.dto";
import { Logger } from "@nestjs/common";
import { GetAllPosts, GetUserPost } from "./dto/res";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePost } from "./dto/req";
export declare class PostsService {
    private prisma;
    logger: Logger;
    constructor(prisma: PrismaService);
    getUserPosts(id: number): Promise<GetUserPost[]>;
    getAllPosts(): Promise<GetAllPosts[]>;
    updatePostId(id: number, updateData: UpdatePost): Promise<boolean>;
    deletePost(id: number): Promise<boolean>;
    createPost(createPost: CreatePost): Promise<boolean>;
}
