import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../../roles/entities/role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column({select: false})
    password: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
}
