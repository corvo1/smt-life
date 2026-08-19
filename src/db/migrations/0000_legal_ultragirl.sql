CREATE TABLE `hydration_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount_ml` integer NOT NULL,
	`logged_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`weight_kg` integer NOT NULL,
	`height_cm` integer NOT NULL,
	`age` integer NOT NULL,
	`activity_level` text NOT NULL,
	`daily_goal_ml` integer NOT NULL,
	`reminder_interval_minutes` integer DEFAULT 60 NOT NULL,
	`quiet_hours_start` text,
	`quiet_hours_end` text
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text DEFAULT 'personal' NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
