CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"visitor_id" varchar(36) NOT NULL,
	"session_id" varchar(36) NOT NULL,
	"page" varchar(512),
	"referrer" varchar(255),
	"device_type" varchar(20),
	"browser" varchar(50),
	"os" varchar(50),
	"country" varchar(2),
	"region" varchar(100),
	"city" varchar(100),
	"ip_hash" varchar(64),
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "analytics_events_created_at_idx" ON "analytics_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "analytics_events_event_type_idx" ON "analytics_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "analytics_events_visitor_id_idx" ON "analytics_events" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "analytics_events_session_id_idx" ON "analytics_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "analytics_events_event_type_created_at_idx" ON "analytics_events" USING btree ("event_type","created_at");