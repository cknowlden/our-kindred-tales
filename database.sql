CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (255),
    "lulu_auth" VARCHAR (255),
    "bubble_auth" VARCHAR (255)
);

CREATE TABLE "project_list" (
	"project_id" SERIAL PRIMARY KEY,
	"project_name" VARCHAR (255),
	"last_updated" TIMESTAMP,
	"contact" VARCHAR (255),
	"status" VARCHAR (80),
	"user_id" INT,
	"lulu_id" BIGINT,
	"pdf_file_id" VARCHAR,
  "name" VARCHAR,
  "phone" VARCHAR,
  "street" VARCHAR,
  "city" VARCHAR,
  "state" VARCHAR,
  "post" VARCHAR,
  "country" VARCHAR
);






