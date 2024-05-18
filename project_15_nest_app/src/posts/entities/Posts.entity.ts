import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostsBlocksContent } from './PostsBlocksContent.entity';

@Index('posts__status_idx', ['status'], {})
@Index('posts_created_at_idx', ['createdAt'], {})
@Index('posts_pkey', ['id'], { unique: true })
@Index('posts_slug_idx', ['slug'], {})
@Entity('posts', { schema: 'public' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', nullable: true })
  title: string | null;

  @Column('timestamp with time zone', { name: 'published_at', nullable: true })
  publishedAt: Date | null;

  @Column('enum', {
    name: 'hero_type',
    nullable: true,
    enum: ['none', 'highImpact', 'mediumImpact', 'lowImpact'],
  })
  heroType: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | null;

  @Column('jsonb', { name: 'hero_rich_text', nullable: true })
  heroRichText: object | null;

  @Column('boolean', { name: 'enable_premium_content', nullable: true })
  enablePremiumContent: boolean | null;

  @Column('character varying', { name: 'slug', nullable: true })
  slug: string | null;

  @Column('character varying', { name: 'meta_title', nullable: true })
  metaTitle: string | null;

  @Column('character varying', { name: 'meta_description', nullable: true })
  metaDescription: string | null;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('enum', {
    name: '_status',
    nullable: true,
    enum: ['draft', 'published'],
  })
  status: 'draft' | 'published' | null;

  @OneToMany(
    () => PostsBlocksContent,
    (postsBlocksContent) => postsBlocksContent.parent,
  )
  postsBlocksContents: PostsBlocksContent[];

  /*@OneToMany(() => CommentsVRels, (commentsVRels) => commentsVRels.posts)
  commentsVRels: CommentsVRels[];

  @OneToMany(() => PagesVRels, (pagesVRels) => pagesVRels.posts)
  pagesVRels: PagesVRels[];

  @OneToMany(() => PostsVRels, (postsVRels) => postsVRels.posts)
  postsVRels: PostsVRels[];

  @OneToMany(() => ProjectsVRels, (projectsVRels) => projectsVRels.posts)
  projectsVRels: ProjectsVRels[];

  @OneToMany(() => CommentsRels, (commentsRels) => commentsRels.posts)
  commentsRels: CommentsRels[];

  @OneToMany(() => PagesRels, (pagesRels) => pagesRels.posts)
  pagesRels: PagesRels[];

  @OneToMany(
    () => PostsBlocksArchive,
    (postsBlocksArchive) => postsBlocksArchive.parent,
  )
  postsBlocksArchives: PostsBlocksArchive[];

  @OneToMany(
    () => PostsBlocksContent,
    (postsBlocksContent) => postsBlocksContent.parent,
  )
  postsBlocksContents: PostsBlocksContent[];

  @OneToMany(() => PostsBlocksCta, (postsBlocksCta) => postsBlocksCta.parent)
  postsBlocksCtas: PostsBlocksCta[];

  @OneToMany(
    () => PostsBlocksMediaBlock,
    (postsBlocksMediaBlock) => postsBlocksMediaBlock.parent,
  )
  postsBlocksMediaBlocks: PostsBlocksMediaBlock[];

  @OneToMany(() => PostsHeroLinks, (postsHeroLinks) => postsHeroLinks.parent)
  postsHeroLinks: PostsHeroLinks[];

  @OneToMany(
    () => PostsPopulatedAuthors,
    (postsPopulatedAuthors) => postsPopulatedAuthors.parent,
  )
  postsPopulatedAuthors: PostsPopulatedAuthors[];

  @OneToMany(() => PostsRels, (postsRels) => postsRels.parent)
  postsRels: PostsRels[];

  @OneToMany(() => PostsRels, (postsRels) => postsRels.posts)
  postsRels2: PostsRels[];

  @OneToMany(() => ProjectsRels, (projectsRels) => projectsRels.posts)
  projectsRels: ProjectsRels[];

  @OneToMany(() => RedirectsRels, (redirectsRels) => redirectsRels.posts)
  redirectsRels: RedirectsRels[];*/
}
