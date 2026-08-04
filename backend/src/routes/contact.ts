import { Router } from "express";
import { contactSchema } from "../schemas/contact";
import { sendContactEmail } from "../services/email";
import { contactLimiter } from "../middleware/rate-limiter";

export const contactRouter = Router();

contactRouter.post("/contact", contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    await sendContactEmail(parsed.data);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
