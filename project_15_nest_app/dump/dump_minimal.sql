CREATE TABLE public."Contact" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying NOT NULL
);

CREATE TABLE public."user" (
    id integer NOT NULL,
    login character varying NOT NULL
);

CREATE TABLE public.user_roles_role (
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL
);

ALTER TABLE ONLY public."Contact"
    ADD CONSTRAINT "Contact_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_role" PRIMARY KEY (id);

ALTER TABLE ONLY public.user_roles_role
    ADD CONSTRAINT "PK_user_role" PRIMARY KEY ("userId", "roleId");

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_user" PRIMARY KEY (id);

ALTER TABLE ONLY public.user_roles_role
    ADD CONSTRAINT "FK_roleId" FOREIGN KEY ("roleId") REFERENCES public.role(id);

ALTER TABLE ONLY public.user_roles_role
    ADD CONSTRAINT "FK_user_id" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;