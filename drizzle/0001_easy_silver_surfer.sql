ALTER TABLE "apis" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "apis" ADD COLUMN "expires_at" timestamp NOT NULL;