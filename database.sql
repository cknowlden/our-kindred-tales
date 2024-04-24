CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (255),
    "lulu_auth" VARCHAR (255),
    "bubble_auth" VARCHAR (255)
);

CREATE TABLE "project_list" (
	"id" SERIAL PRIMARY KEY,
	"project_name" VARCHAR (255),
	"last_updated" TIMESTAMP,
	"contact" VARCHAR (255),
	"status" VARCHAR (80),
	"action" VARCHAR (150),
	"user_id" INT
);


CREATE TABLE "project_details" (
	"project_id" BIGINT,
	"book_title" VARCHAR (255),
	"author" VARCHAR (150),
	"image_url" VARCHAR,
	"pdf_only" BOOLEAN,
	"gutter_margin" BOOLEAN,
	"full_bleed" BOOLEAN,
	"content" VARCHAR,
	"page_count" BIGINT,
	"margin_add" INT,
	"interior_margin" INT,
	"fbinterior_margin" INT,
	"spine_width" INT
);

DROP TABLE "project_details";

CREATE TABLE "status" (
	"customer_review" BOOLEAN,
	"exceeds_page_limit" BIGINT,
	"sent_to_publisher" BOOLEAN,
	"ready_for_admin_review" BOOLEAN,
	"completed" BOOLEAN
);