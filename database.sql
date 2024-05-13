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
	"pdf_file_id" VARCHAR(255)
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

INSERT INTO "project_details" ("book_title", "author", "image_url", "pdf_only", "gutter_margin", "full_bleed", "page_count", "margin_add", "interior_margin", "fbinterior_margin", "spine_width", "add_title_divider", "pdf_file_id", "url")
	VALUES
		('Footprints Through the Journey of My Life', 'Evelyn Graham', 'https://picsum.photos/200/300', FALSE, 3, TRUE, 100, 1, 1, 2, 2, TRUE, '1700541671277x948515555305848800_interior', 'https://app.kindredtales.net/version-test/'),
		('Adventures with Grandma', 'Selma March', 'https://picsum.photos/200/300', TRUE, 2, FALSE, 50, 1, 1, 2, 2, FALSE, '1445464654654654564x46548484654_interior', 'https://app.kindredtales.net/canned-info'); 



UPDATE "project_list" SET "status" = 'ready for client review', "contact" = 'evie89@gmail.com' WHERE "project_name" = 'Footprints Through the Journey of My Life';

UPDATE "project_list" SET "status" = 'sent to publisher', "contact" = 'g.brown785@hotmail.com' WHERE "project_name" = 'Traversing The Unknown';

UPDATE "project_list" SET "status" = 'client has review and approved', "contact" = 'oregondrummer88@gmail.com' WHERE "project_name" = 'Modern Oregon Trail';

UPDATE "project_list" SET "status" = 'ready for client review', "contact" = 'barbara902@aol.com' WHERE "project_name" = 'Moments That Shaped Me';

UPDATE "project_list" SET "status" = 'sent to publisher', "contact" = 'augustine_weather@gmail.com' WHERE "project_name" = 'For A Loving and Beautiful Family';

UPDATE "project_list" SET "status" = 'sent to publisher', "contact" = 'eve_graham@gmail.com' WHERE "project_name" = 'TEST Footprints Through the Journey of My Life';






