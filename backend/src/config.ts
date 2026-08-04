import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().default(""),
  EMAIL_FROM: z.string().default("Portfolio Contact <onboarding@resend.dev>"),
  EMAIL_TO: z.string().default("diego1silva2@gmail.com"),
});

export const config = configSchema.parse(process.env);
