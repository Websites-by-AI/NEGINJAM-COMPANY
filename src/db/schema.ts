import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/** خدمات قابل ارائه توسط شرکت خدماتی نگین جم */
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  division: varchar("division", { length: 32 }).notNull().default("cleaning"),
  title: varchar("title", { length: 120 }).notNull(),
  summary: text("summary").notNull(),
  icon: varchar("icon", { length: 16 }).notNull().default("✨"),
  imageUrl: text("image_url").notNull().default(""),
  priceFrom: integer("price_from").notNull().default(0),
  priceUnit: varchar("price_unit", { length: 64 }).notNull().default("هر نفر / روز"),
  features: jsonb("features")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** درخواست‌های ثبت‌شده مشتریان */
export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 16 }).notNull().unique(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: text("address").notNull(),
  district: varchar("district", { length: 80 }).notNull().default(""),
  serviceSlug: varchar("service_slug", { length: 64 }).notNull(),
  serviceTitle: varchar("service_title", { length: 120 }).notNull(),
  requestType: varchar("request_type", { length: 32 }).notNull().default("service"),
  preferredDate: varchar("preferred_date", { length: 40 }).notNull().default(""),
  timeSlot: varchar("time_slot", { length: 40 }).notNull().default(""),
  workers: integer("workers").notNull().default(1),
  notes: text("notes").notNull().default(""),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** درخواست‌های همکاری دوجانبه */
export const partnershipRequests = pgTable("partnership_requests", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 16 }).notNull().unique(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  businessName: varchar("business_name", { length: 160 }).notNull().default(""),
  businessType: varchar("business_type", { length: 100 }).notNull().default(""),
  partnershipArea: varchar("partnership_area", { length: 200 }).notNull().default(""),
  notes: text("notes").notNull().default(""),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type NewServiceRequest = typeof serviceRequests.$inferInsert;
export type PartnershipRequest = typeof partnershipRequests.$inferSelect;
export type NewPartnershipRequest = typeof partnershipRequests.$inferInsert;
