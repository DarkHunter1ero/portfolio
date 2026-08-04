import { Resend } from "resend";
import { config } from "../config";
import type { ContactFormData } from "../schemas/contact";

const resend = config.RESEND_API_KEY
  ? new Resend(config.RESEND_API_KEY)
  : null;

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  if (!resend) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email send");
    console.log("[Email] Would have sent:", {
      to: config.EMAIL_TO,
      from: data.email,
      subject: `Portfolio Contact: ${data.name}`,
      messageLength: data.message.length,
    });
    return;
  }

  await resend.emails.send({
    from: config.EMAIL_FROM,
    to: config.EMAIL_TO,
    subject: `Portfolio Contact: ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    replyTo: data.email,
  });
}
