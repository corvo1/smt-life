import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  weightKg: integer('weight_kg').notNull(),
  heightCm: integer('height_cm').notNull(),
  age: integer('age').notNull(),
  activityLevel: text('activity_level', { enum: ['low', 'moderate', 'high'] }).notNull(),
  dailyGoalMl: integer('daily_goal_ml').notNull(),
  reminderIntervalMinutes: integer('reminder_interval_minutes').notNull().default(60),
  quietHoursStart: text('quiet_hours_start'),
  quietHoursEnd: text('quiet_hours_end'),
});

export const hydrationLogs = sqliteTable('hydration_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  amountMl: integer('amount_ml').notNull(),
  loggedAt: integer('logged_at', { mode: 'timestamp' }).notNull(),
});

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  category: text('category', { enum: ['work', 'personal', 'health'] }).notNull().default('personal'),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
