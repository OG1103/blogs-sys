import express from "express";
import dotenv from "dotenv";
import connectDB from "./Db/connect.js";
import morgan from "morgan";
import intializeRoutes from "./Routes/index.js";
import ErrorHandlerMiddleware from "./Middlewares/error-handler.js";
import "./Models/index.js";

dotenv.config();

// Midlewares
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//InitializeRoutes
intializeRoutes(app);

// Error Handler Middleware
app.use(ErrorHandlerMiddleware); // Error handler middleware

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
