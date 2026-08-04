import express from "express";
import cors from "cors";
import { config } from "./config";
import { healthRouter } from "./routes/health";
import { contactRouter } from "./routes/contact";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.use("/api", healthRouter);
app.use("/api", contactRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Backend running on port ${config.PORT}`);
});

export default app;
