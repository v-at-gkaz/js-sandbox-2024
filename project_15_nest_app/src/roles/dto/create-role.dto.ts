import {Allow, IsString} from "class-validator";

export class CreateRoleDto {
    @IsString()
    name: string;
    @Allow()
    theDescription?: string;
}
