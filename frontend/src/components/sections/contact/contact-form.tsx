"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { contactSchema, type ContactFormData } from "@/types/contact";
import { buttonTap } from "@/lib/animations";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ContactForm() {
  const t = useTranslations("Contact");
  const tv = useTranslations("Contact.validation");

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>(
    {}
  );
  const [state, setState] = useState<FormState>({ status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (fieldErrors[name as keyof ContactFormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function getValidationMessage(key: string): string {
    const messages: Record<string, string> = {
      nameMin: tv("nameMin"),
      emailInvalid: tv("emailInvalid"),
      messageMin: tv("messageMin"),
    };
    return messages[key] ?? key;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation with translated messages
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const errors: Partial<Record<keyof ContactFormData, string>> = {};
      const fieldErrs = result.error.flatten().fieldErrors;
      for (const [key, msgs] of Object.entries(fieldErrs)) {
        if (msgs && msgs.length > 0) {
          const zodMsg = msgs[0];
          // Map Zod messages to translated messages
          if (zodMsg.includes("at least 2 characters")) {
            errors[key as keyof ContactFormData] = getValidationMessage("nameMin");
          } else if (zodMsg.includes("valid email")) {
            errors[key as keyof ContactFormData] = getValidationMessage("emailInvalid");
          } else if (zodMsg.includes("at least 10 characters")) {
            errors[key as keyof ContactFormData] = getValidationMessage("messageMin");
          } else {
            errors[key as keyof ContactFormData] = zodMsg;
          }
        }
      }
      setFieldErrors(errors);
      return;
    }

    setState({ status: "submitting" });
    setFieldErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const body = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setState({
            status: "error",
            message: t("rateLimit"),
          });
          return;
        }

        if (res.status === 400 && body.fieldErrors) {
          const errors: Partial<Record<keyof ContactFormData, string>> = {};
          for (const [key, msgs] of Object.entries(body.fieldErrors)) {
            if (Array.isArray(msgs) && msgs.length > 0) {
              errors[key as keyof ContactFormData] = msgs[0] as string;
            }
          }
          setFieldErrors(errors);
          setState({ status: "idle" });
          return;
        }

        throw new Error(body.error ?? "Server error");
      }

      setState({ status: "success" });
      setFormData({ name: "", email: "", message: "" });

      // Reset to idle after 5 seconds
      setTimeout(() => setState({ status: "idle" }), 5000);
    } catch {
      setState({
        status: "error",
        message: t("networkError"),
      });
    }
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-green-800/30 bg-green-900/10 p-8 text-center"
      >
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{t("successTitle")}</h3>
        <p className="text-sm text-muted-foreground">{t("successMessage")}</p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Error alert */}
      {state.status === "error" && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
          {t("name")}
        </label>
        <Input
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("namePlaceholder")}
          disabled={state.status === "submitting"}
          aria-describedby={fieldErrors.name ? "name-error" : undefined}
          aria-invalid={!!fieldErrors.name}
        />
        {fieldErrors.name && (
          <p id="name-error" className="text-xs text-destructive mt-1.5">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
          {t("email")}
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("emailPlaceholder")}
          disabled={state.status === "submitting"}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <p id="email-error" className="text-xs text-destructive mt-1.5">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          {t("message")}
        </label>
        <Textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("messagePlaceholder")}
          disabled={state.status === "submitting"}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          aria-invalid={!!fieldErrors.message}
        />
        {fieldErrors.message && (
          <p id="message-error" className="text-xs text-destructive mt-1.5">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.div {...buttonTap}>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full gap-2"
          disabled={state.status === "submitting"}
        >
          {state.status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("send")}
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
