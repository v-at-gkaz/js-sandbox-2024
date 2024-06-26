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
exports.PostsBlocksContentColumns = void 0;
const typeorm_1 = require("typeorm");
const PostsBlocksContent_entity_1 = require("./PostsBlocksContent.entity");
let PostsBlocksContentColumns = class PostsBlocksContentColumns {
};
exports.PostsBlocksContentColumns = PostsBlocksContentColumns;
__decorate([
    (0, typeorm_1.Column)('integer', { name: '_order' }),
    __metadata("design:type", Number)
], PostsBlocksContentColumns.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: '_parent_id' }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { primary: true, name: 'id' }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'size',
        nullable: true,
        enum: ['oneThird', 'half', 'twoThirds', 'full'],
    }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { name: 'rich_text', nullable: true }),
    __metadata("design:type", Object)
], PostsBlocksContentColumns.prototype, "richText", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'enable_link', nullable: true }),
    __metadata("design:type", Boolean)
], PostsBlocksContentColumns.prototype, "enableLink", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'link_type',
        nullable: true,
        enum: ['reference', 'custom'],
    }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "linkType", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'link_new_tab', nullable: true }),
    __metadata("design:type", Boolean)
], PostsBlocksContentColumns.prototype, "linkNewTab", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'link_url', nullable: true }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "linkUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'link_label', nullable: true }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "linkLabel", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'link_appearance',
        nullable: true,
        enum: ['default', 'primary', 'secondary'],
    }),
    __metadata("design:type", String)
], PostsBlocksContentColumns.prototype, "linkAppearance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PostsBlocksContent_entity_1.PostsBlocksContent, (postsBlocksContent) => postsBlocksContent.postsBlocksContentColumns, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: '_parent_id', referencedColumnName: 'id' }]),
    __metadata("design:type", PostsBlocksContent_entity_1.PostsBlocksContent)
], PostsBlocksContentColumns.prototype, "parent", void 0);
exports.PostsBlocksContentColumns = PostsBlocksContentColumns = __decorate([
    (0, typeorm_1.Index)('posts_blocks_content_columns_order_idx', ['order'], {}),
    (0, typeorm_1.Index)('posts_blocks_content_columns_parent_id_idx', ['parentId'], {}),
    (0, typeorm_1.Index)('posts_blocks_content_columns_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('posts_blocks_content_columns', { schema: 'public' })
], PostsBlocksContentColumns);
