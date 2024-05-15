import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/Posts.entity';
import { PostsBlocksContent } from './entities/PostsBlocksContent.entity';
import { PostsBlocksContentColumns } from './entities/PostsBlocksContentColumns.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Posts,
      PostsBlocksContent,
      PostsBlocksContentColumns,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
