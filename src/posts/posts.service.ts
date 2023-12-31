import { CreatePost } from "./dto/req/createPost.dto";
import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { GetAllPosts, GetUserPost } from "./dto/res";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { MessageService } from "../message/message.service";
import { Prisma } from "@prisma/client";
import { UpdatePost } from "./dto/req";

@Injectable()
export class PostsService {
  logger: Logger;
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private message: MessageService
  ) {
    this.logger=new Logger();
  }

  async getUserPosts(id: number): Promise<GetUserPost[]> {
    const postData = await this.prisma.post.findMany({
      where: {
        authorId: Number(id),
      },

      include: {
        categories: true,
      },
    });

    console.log(postData);

    return postData;
  }

  async getAllPosts(): Promise<GetAllPosts[]> {
    const postData = await this.prisma.post.findMany({
      include: {
        author: true,
        categories: true,
      },
    });

    const allPosts = postData.map((post) => {
      return {
        id: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        title: post.title,
        published: post.published,
        authorId: post.authorId,
        approve: post.approve,
        hashtag: post.hashtag,
        story: post.story,
        authorUserName: post.author.userName,
        categories: post.categories,
      };
    });
    this.logger.log("Posts sent")
    return allPosts;
  }

  async updatePostId(id: number, updateData: UpdatePost): Promise<boolean> {
    console.log(updateData);

    await this.prisma.post
      .update({
        where: {
          id: Number(id),
        },
        data: {
          updatedAt: updateData.updatedAt,
          title: updateData?.title,
          published: updateData.published,
          authorId: updateData.authorId,
          approve: updateData?.approve,
          hashtag: updateData?.hashtag,
          story: updateData?.story,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });
    return true;
  }

  async deletePost(id: number): Promise<boolean> {
    await this.prisma.post
      .delete({
        where: {
          id: Number(id),
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });
    return true;
  }

  async createPost(createPost: CreatePost): Promise<boolean> {
    const postData = createPost.categories?.map((ctgryId) => {
      return { id: ctgryId };
    });
    await this.prisma.post
      .create({
        data: {
          title: createPost.title,
          published: createPost.published,
          authorId: createPost.authorId,
          approve: createPost.approve,
          hashtag: createPost.hashtag,
          story: createPost.story,
          categories: {
            connect: postData,
          },
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });
    return true;
  }
}
