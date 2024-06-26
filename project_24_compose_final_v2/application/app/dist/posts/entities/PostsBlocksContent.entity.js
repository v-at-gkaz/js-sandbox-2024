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
exports.PostsBlocksContent = void 0;
const typeorm_1 = require("typeorm");
const Posts_entity_1 = require("./Posts.entity");
const PostsBlocksContentColumns_entity_1 = require("./PostsBlocksContentColumns.entity");
let PostsBlocksContent = class PostsBlocksContent {
};
exports.PostsBlocksContent = PostsBlocksContent;
__decorate([
    (0, typeorm_1.Column)('integer', { name: '_order' }),
    __metadata("design:type", Number)
], PostsBlocksContent.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: '_parent_id' }),
    __metadata("design:type", Number)
], PostsBlocksContent.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: '_path' }),
    __metadata("design:type", String)
], PostsBlocksContent.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { primary: true, name: 'id' }),
    __metadata("design:type", String)
], PostsBlocksContent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'invert_background', nullable: true }),
    __metadata("design:type", Boolean)
], PostsBlocksContent.prototype, "invertBackground", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'block_name', nullable: true }),
    __metadata("design:type", String)
], PostsBlocksContent.prototype, "blockName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PostsBlocksContentColumns_entity_1.PostsBlocksContentColumns, (postsBlocksContentColumns) => postsBlocksContentColumns.parent),
    __metadata("design:type", Array)
], PostsBlocksContent.prototype, "postsBlocksContentColumns", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Posts_entity_1.Posts, (posts) => posts.postsBlocksContents, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: '_parent_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Posts_entity_1.Posts)
], PostsBlocksContent.prototype, "parent", void 0);
exports.PostsBlocksContent = PostsBlocksContent = __decorate([
    (0, typeorm_1.Index)('posts_blocks_content_order_idx', ['order'], {}),
    (0, typeorm_1.Index)('posts_blocks_content_parent_id_idx', ['parentId'], {}),
    (0, typeorm_1.Index)('posts_blocks_content_path_idx', ['path'], {}),
    (0, typeorm_1.Index)('posts_blocks_content_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('posts_blocks_content', { schema: 'public' })
], PostsBlocksContent);
