CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text,
	"author" text,
	"likes" integer DEFAULT 0
);
