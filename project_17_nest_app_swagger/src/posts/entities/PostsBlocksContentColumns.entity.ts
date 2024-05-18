import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PostsBlocksContent } from './PostsBlocksContent.entity';

@Index('posts_blocks_content_columns_order_idx', ['order'], {})
@Index('posts_blocks_content_columns_parent_id_idx', ['parentId'], {})
@Index('posts_blocks_content_columns_pkey', ['id'], { unique: true })
@Entity('posts_blocks_content_columns', { schema: 'public' })
export class PostsBlocksContentColumns {
  @Column('integer', { name: '_order' })
  order: number;

  @Column('character varying', { name: '_parent_id' })
  parentId: string;

  @Column('character varying', { primary: true, name: 'id' })
  id: string;

  @Column('enum', {
    name: 'size',
    nullable: true,
    enum: ['oneThird', 'half', 'twoThirds', 'full'],
  })
  size: 'oneThird' | 'half' | 'twoThirds' | 'full' | null;

  @Column('jsonb', { name: 'rich_text', nullable: true })
  richText: object | null;

  @Column('boolean', { name: 'enable_link', nullable: true })
  enableLink: boolean | null;

  @Column('enum', {
    name: 'link_type',
    nullable: true,
    enum: ['reference', 'custom'],
  })
  linkType: 'reference' | 'custom' | null;

  @Column('boolean', { name: 'link_new_tab', nullable: true })
  linkNewTab: boolean | null;

  @Column('character varying', { name: 'link_url', nullable: true })
  linkUrl: string | null;

  @Column('character varying', { name: 'link_label', nullable: true })
  linkLabel: string | null;

  @Column('enum', {
    name: 'link_appearance',
    nullable: true,
    enum: ['default', 'primary', 'secondary'],
  })
  linkAppearance: 'default' | 'primary' | 'secondary' | null;

  @ManyToOne(
    () => PostsBlocksContent,
    (postsBlocksContent) => postsBlocksContent.postsBlocksContentColumns,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: '_parent_id', referencedColumnName: 'id' }])
  parent: PostsBlocksContent;
}
