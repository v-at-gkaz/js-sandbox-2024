"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitDb1715802845228 = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
const user = configService.get('SUBD_USER', 'user');
const db = configService.get('SUBD_DB', 'db');
class InitDb1715802845228 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE typeorm.role (
            id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            name character varying NOT NULL,
            the_description character varying
        );
        
        ALTER TABLE typeorm.role OWNER TO ${user};
        
        CREATE TABLE typeorm."user" (
            id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            login character varying NOT NULL,
            password character varying NOT NULL
        );
        
        ALTER TABLE typeorm."user" OWNER TO ${user};
           
        CREATE TABLE typeorm.user_roles_role (
            user_id uuid NOT NULL,
            role_id uuid NOT NULL
        );
        
        ALTER TABLE typeorm.user_roles_role OWNER TO ${user};
        ALTER TABLE ONLY typeorm.role ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);
        ALTER TABLE ONLY typeorm."user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
        ALTER TABLE ONLY typeorm.user_roles_role ADD CONSTRAINT "PK_cbb8cdf197992a93da55155c14e" PRIMARY KEY (user_id, role_id);
        ALTER TABLE ONLY typeorm."user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE (login);
        
        CREATE INDEX "IDX_09d115a69b6014d324d592f9c4" ON typeorm.user_roles_role USING btree (user_id);
        CREATE INDEX "IDX_0e2f5483d5e8d52043f9763453" ON typeorm.user_roles_role USING btree (role_id);
        
        ALTER TABLE ONLY typeorm.user_roles_role
            ADD CONSTRAINT "FK_09d115a69b6014d324d592f9c42" 
            FOREIGN KEY (user_id) REFERENCES typeorm."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
        
        ALTER TABLE ONLY typeorm.user_roles_role
            ADD CONSTRAINT "FK_0e2f5483d5e8d52043f97634538" 
            FOREIGN KEY (role_id) REFERENCES typeorm.role(id);
      `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE typeorm.user_roles_role;
      DROP TABLE typeorm.role;
      DROP TABLE typeorm."user";
      `);
    }
}
exports.InitDb1715802845228 = InitDb1715802845228;
