import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Posts } from './Posts.entity';
import { PostsBlocksContentColumns } from './PostsBlocksContentColumns.entity';

@Index('posts_blocks_content_order_idx', ['order'], {})
@Index('posts_blocks_content_parent_id_idx', ['parentId'], {})
@Index('posts_blocks_content_path_idx', ['path'], {})
@Index('posts_blocks_content_pkey', ['id'], { unique: true })
@Entity('posts_blocks_content', { schema: 'public' })
export class PostsBlocksContent {
  @Column('integer', { name: '_order' })
  order: number;

  @Column('integer', { name: '_parent_id' })
  parentId: number;

  @Column('text', { name: '_path' })
  path: string;

  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('boolean', { name: 'invert_background', nullable: true })
  invertBackground: boolean | null;

  @Column('character varying', { name: 'block_name', nullable: true })
  blockName: string | null;

  @OneToMany(
    () => PostsBlocksContentColumns,
    (postsBlocksContentColumns) => postsBlocksContentColumns.parent,
  )
  postsBlocksContentColumns: PostsBlocksContentColumns[];

  @ManyToOne(() => Posts, (posts) => posts.postsBlocksContents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: '_parent_id', referencedColumnName: 'id' }])
  parent: Posts;
}
