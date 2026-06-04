import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes"
import recipeRoutes from "./routes/recipe.routes";
import favoriteRoutes from "./routes/favorite.routes"

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"))

app.use(express.json());

app.use("/health", healthRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/favorites", favoriteRoutes)

app.use(errorHandler)

export default app;