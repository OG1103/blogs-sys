import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./Db/connect.js";
import morgan from "morgan";
import intializeRoutes from "./Routes/index.js";
import ErrorHandlerMiddleware from "./Middlewares/error-handler.js";
import NotFoundMiddleware from "./Middlewares/not-found.js";
import cors from "cors";
import "./Models/index.js";

dotenv.config();

// Midlewares
const app = express();

// Dynamically allow all origins while supporting credentials
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from any origin
      callback(null, true);
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

//InitializeRoutes
intializeRoutes(app);

// Error Handler Middleware
app.use(ErrorHandlerMiddleware); // Error handler middleware

app.use("*", NotFoundMiddleware);

(async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
