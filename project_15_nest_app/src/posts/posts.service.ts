import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/Posts.entity';
import { Repository } from 'typeorm';
import { PostsBlocksContentColumns } from './entities/PostsBlocksContentColumns.entity';
/*import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';*/

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsBlocksContentColumns)
    private columnsRepo: Repository<PostsBlocksContentColumns>,
    @InjectRepository(Posts) private postRepo: Repository<Posts>,
  ) {}

  /*create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }*/

  async findAll() {
    const posts = await this.postRepo.find({
      relations: ['postsBlocksContents'],
    });

    for (const post of posts) {
      const contentIds = post.postsBlocksContents.map((o: any) => o.id);
      // console.log('post', post, contentIds);

      // @ts-ignore
      post.content = [];

      for (const contentId of contentIds) {
        const content = await this.columnsRepo.findOne({
          where: {
            parentId: contentId,
          },
        });

        // @ts-ignore
        post.content.push(content);
      }
    }

    return Promise.resolve(posts);

    /*
    * .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .leftJoinAndSelect("role.permissions", "permissions")
    .getMany()
    * */
  }

  /*findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }*/
}
