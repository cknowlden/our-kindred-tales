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
  "country" VARCHAR,
  "cover_url" VARCHAR,
  "interior_url" VARCHAR,
  "shipping_level" VARCHAR
);


CREATE TABLE "project_details" (
	"id" SERIAL PRIMARY KEY,
	"book_title" VARCHAR,
	"author" VARCHAR (150),
	"image_url" VARCHAR,
	"pdf_only" BOOLEAN,
	"gutter_margin" INT,
	"full_bleed" BOOLEAN,
	"content" VARCHAR,
	"page_count" BIGINT,
	"margin_add" INT,
	"interior_margin" INT,
	"fbinterior_margin" INT,
	"spine_width" INT,
	"add_title_divider" BOOLEAN,
	"pdf_file_id" VARCHAR,
	"url" VARCHAR	
);





