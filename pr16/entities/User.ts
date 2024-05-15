import { Column, Entity, ManyToMany } from "typeorm";
import { Role } from "./Role";

@Entity("user", { schema: "public" })
export class User {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "login" })
  login: string;

  @Column("character varying", { name: "password" })
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
