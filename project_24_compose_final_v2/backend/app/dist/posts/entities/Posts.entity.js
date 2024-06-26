"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const typeorm_1 = require("typeorm");
const PostsBlocksContent_entity_1 = require("./PostsBlocksContent.entity");
let Posts = class Posts {
};
exports.Posts = Posts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Posts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'title', nullable: true }),
    __metadata("design:type", String)
], Posts.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'published_at', nullable: true }),
    __metadata("design:type", Date)
], Posts.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'hero_type',
        nullable: true,
        enum: ['none', 'highImpact', 'mediumImpact', 'lowImpact'],
    }),
    __metadata("design:type", String)
], Posts.prototype, "heroType", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { name: 'hero_rich_text', nullable: true }),
    __metadata("design:type", Object)
], Posts.prototype, "heroRichText", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'enable_premium_content', nullable: true }),
    __metadata("design:type", Boolean)
], Posts.prototype, "enablePremiumContent", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'slug', nullable: true }),
    __metadata("design:type", String)
], Posts.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'meta_title', nullable: true }),
    __metadata("design:type", String)
], Posts.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'meta_description', nullable: true }),
    __metadata("design:type", String)
], Posts.prototype, "metaDescription", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', {
        name: 'updated_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Posts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], Posts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: '_status',
        nullable: true,
        enum: ['draft', 'published'],
    }),
    __metadata("design:type", String)
], Posts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostsBlocksContent_entity_1.PostsBlocksContent, (postsBlocksContent) => postsBlocksContent.parent),
    __metadata("design:type", Array)
], Posts.prototype, "postsBlocksContents", void 0);
exports.Posts = Posts = __decorate([
    (0, typeorm_1.Index)('posts__status_idx', ['status'], {}),
    (0, typeorm_1.Index)('posts_created_at_idx', ['createdAt'], {}),
    (0, typeorm_1.Index)('posts_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Index)('posts_slug_idx', ['slug'], {}),
    (0, typeorm_1.Entity)('posts', { schema: 'public' })
], Posts);
