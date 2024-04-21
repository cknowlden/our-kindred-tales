
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

INSERT INTO "user" ("username", "password")
    VALUES ('admin', 'p@ssw0rd!!') RETURNING id;

CREATE TABLE "project-list" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (150),
	"updated" TIMESTAMP,
	"status" VARCHAR (80),
	"action" VARCHAR (150)
);

CREATE TABLE "project-metadata" (
	"title" VARCHAR (150),
	"author" VARCHAR (150),
	"pdf" BOOLEAN,
	"gutter_margin" BOOLEAN,
	"full_bleed" BOOLEAN,
	"json" VARCHAR
);

CREATE TABLE "gutter-addition" (
	"page_count" BIGINT,
	"margin_add" BIGINT,
	"interior_margin" BIGINT,
	"fb_interior_margin" BIGINT
);

CREATE TABLE "spine-width" (
	"page_count" BIGINT,
	"spine_width" BIGINT
);