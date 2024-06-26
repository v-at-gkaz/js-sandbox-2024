"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserStructure1716019173752 = void 0;
class ChangeUserStructure1716019173752 {
    constructor() {
        this.name = 'ChangeUserStructure1716019173752';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "typeorm"."user" ADD "descr" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "typeorm"."user" DROP COLUMN "descr"`);
    }
}
exports.ChangeUserStructure1716019173752 = ChangeUserStructure1716019173752;
