CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (255),
    "lulu_auth" VARCHAR (255),
    "bubble_auth" VARCHAR (255)
);

CREATE TABLE "project_list" (
	"project_id" INT,
	"project_name" VARCHAR (255),
	"last_updated" TIMESTAMP,
	"contact" VARCHAR (255),
	"status" VARCHAR (80),
	"action" VARCHAR (150),
	"user_id" INT,
	"lulu_id" BIGINT
);

INSERT INTO "project_list" ("project_id", "project_name", "last_updated", "contact", "status")
	VALUES 
		(1, 'Footprints Through the Journey of My Life', '2024-04-24', 'evie89@gmail.com', 'ready for client review'),
		(2, 'Adventures with Grandma', '2024-03-21', 'Gertrude75@hotmail.com', 'sent to publisher');


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

CREATE TABLE "status" (
	"customer_review" BOOLEAN,
	"exceeds_page_limit" BIGINT,
	"sent_to_publisher" BOOLEAN,
	"ready_for_admin_review" BOOLEAN,
	"completed" BOOLEAN
);