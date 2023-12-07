import "express-async-errors";

import express, { json } from "express";
import cors from "cors";
import { loadEnv } from "./config";
import { errorHandler } from "./middlewares";
import {
  authenticationRouter,
  usersRouter,
} from "./routers";
import { notificationRouter } from "./routers/notification-router";

loadEnv();

const app = express();

app.use(json());
app.use(cors());

// Define your routes
app.get("/health", (_req, res) => res.send("OK!"));
app.use("/auth", authenticationRouter);
app.use("/users", usersRouter);
app.use("/user-notification", notificationRouter);
app.use("/search", /* searchRouter */)
app.use("character", /* characterRouter */)


// After all other routes, define your catch-all 404 handler
app.use((_, res) => {
  res.status(404).json({ error: "NOT FOUND" });
});

// Finally, after defining all routes, add your error handler
app.use(errorHandler);

export default app;