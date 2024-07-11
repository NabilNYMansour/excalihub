CREATE TABLE `drawings` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`is_public` integer NOT NULL,
	`slug` text NOT NULL,
	`created_at` text NOT NULL,
	`payload` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `events` (
	`event_id` integer PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`clerkId` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `drawings_slug_unique` ON `drawings` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_clerkId_unique` ON `users` (`clerkId`);