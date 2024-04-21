import {Allow} from "class-validator";

export class RolesDto {
    @Allow()
    roleIds: Array<string>;
}