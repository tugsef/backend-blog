import { PostsService } from './posts.service';
import { GetAllPosts, GetUserPost } from './dto/res';
import { CreatePost, UpdatePost } from './dto/req';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    getUserPosts(id: number): Promise<GetUserPost[]>;
    getAllPosts(): Promise<GetAllPosts[]>;
    updatePostId(id: number, updateData: UpdatePost): Promise<boolean>;
    deletePost(id: number): Promise<boolean>;
    createPost(createPost: CreatePost): Promise<boolean>;
}
