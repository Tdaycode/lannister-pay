import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import cors from "cors";
// import paymentRoutes from "./routes/paymentRoutes.js";


const app = express();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cors());

// app.use("/api/v1/pay", paymentRoutes);
app.get("/", function (req, res) {
  res.set("Content-Type", "text/json");
  res.status(200).send("app is working ");
});


app.use(notFound);
app.use(errorHandler);

export default app;
