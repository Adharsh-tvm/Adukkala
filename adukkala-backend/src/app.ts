import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes"
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"))

app.use(express.json());

app.use("/health", healthRoutes);

app.use("/api/auth", authRoutes)

app.use(errorHandler)

export default app;