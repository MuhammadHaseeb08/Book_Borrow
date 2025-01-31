import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
  date
} from "drizzle-orm/pg-core";
export const statusEnum = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const roleEnum = pgEnum("role", ["ADMIN", "USER"]);
export const borrowStatusEnum = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const usersTable = pgTable("users_table", {
  id: uuid("id").unique().notNull().primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  universityId: integer("university_id").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: statusEnum("status").default("PENDING"),
  role:roleEnum("role").default("USER"),
  lastActivity:date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at",{
    withTimezone:true
  }).notNull().defaultNow(),
 
});


