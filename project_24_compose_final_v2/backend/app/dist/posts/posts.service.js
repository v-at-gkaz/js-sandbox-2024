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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Posts_entity_1 = require("./entities/Posts.entity");
const typeorm_2 = require("typeorm");
const PostsBlocksContentColumns_entity_1 = require("./entities/PostsBlocksContentColumns.entity");
let PostsService = class PostsService {
    constructor(columnsRepo, postRepo) {
        this.columnsRepo = columnsRepo;
        this.postRepo = postRepo;
    }
    async findAll() {
        const posts = await this.postRepo.find({
            relations: ['postsBlocksContents'],
        });
        for (const post of posts) {
            const contentIds = post.postsBlocksContents.map((o) => o.id);
            post.content = [];
            for (const contentId of contentIds) {
                const content = await this.columnsRepo.findOne({
                    where: {
                        parentId: contentId,
                    },
                });
                post.content.push(content);
            }
        }
        return Promise.resolve(posts);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(PostsBlocksContentColumns_entity_1.PostsBlocksContentColumns)),
    __param(1, (0, typeorm_1.InjectRepository)(Posts_entity_1.Posts)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
