import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const loveMessages = pgTable("love_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const reminders = pgTable("reminders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const loveTasks = pgTable("love_tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const virtualHugs = pgTable("virtual_hugs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message"),
  hugType: text("hug_type").default("warm").notNull(),
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const complaints = pgTable("complaints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("open").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLoveMessageSchema = createInsertSchema(loveMessages).omit({
  id: true,
  createdAt: true,
});

export const insertReminderSchema = createInsertSchema(reminders).omit({
  id: true,
  createdAt: true,
});

export const insertLoveTaskSchema = createInsertSchema(loveTasks).omit({
  id: true,
  createdAt: true,
});

export const insertVirtualHugSchema = createInsertSchema(virtualHugs).omit({
  id: true,
  sentAt: true,
});

export const insertComplaintSchema = createInsertSchema(complaints).omit({
  id: true,
  createdAt: true,
});

export type LoveMessage = typeof loveMessages.$inferSelect;
export type InsertLoveMessage = z.infer<typeof insertLoveMessageSchema>;

export type Reminder = typeof reminders.$inferSelect;
export type InsertReminder = z.infer<typeof insertReminderSchema>;

export type LoveTask = typeof loveTasks.$inferSelect;
export type InsertLoveTask = z.infer<typeof insertLoveTaskSchema>;

export type VirtualHug = typeof virtualHugs.$inferSelect;
export type InsertVirtualHug = z.infer<typeof insertVirtualHugSchema>;

export type Complaint = typeof complaints.$inferSelect;
export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
