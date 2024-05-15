import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity("role", { schema: "public" })
export class Role {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "the_description", nullable: true })
  theDescription: string | null;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({
    name: "user_roles_role",
    joinColumns: [{ name: "role_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "public",
  })
  users: User[];
}
