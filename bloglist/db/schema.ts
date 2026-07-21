import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  unique,
  boolean,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url"),
  author: text("author"),
  likes: integer("likes").default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
});
export const readingList = pgTable(
  "reading_list",
  {
    id: serial("id").primaryKey(),
    read: boolean("read").default(false),
    userId: integer("user_id").references(() => users.id),
    blogId: integer("blog_id").references(() => blogs.id),
  },
  (table) => ({
    uniqueReading: unique().on(table.userId, table.blogId),
  }),
);

export const userRelation = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingList),
}));

export const blogRelation = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));

export const readingListRelations = relations(readingList, ({ one }) => ({
  blog: one(blogs, {
    fields: [readingList.blogId],
    references: [blogs.id],
  }),
  user: one(users, {
    fields: [readingList.userId],
    references: [users.id],
  }),
}));
