CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TYPE "public"."job_status" AS ENUM('pending', 'in_progress', 'completed', 'failed');--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" varchar(150) NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "apis" (
	"api_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"api_key" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "apis_api_key_unique" UNIQUE("api_key")
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payload" jsonb NOT NULL,
	"status" "job_status" DEFAULT 'pending' NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "apis" ADD CONSTRAINT "apis_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;