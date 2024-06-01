import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controller/errorController.js";
import userRouter from "./router/userRouter.js";
import { CustomError } from "./utils/customerError.js";
import cors from "cors";
import productRouter from "./router/productRouter.js";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.BASE_URL],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/user", userRouter);



app.use("/product", productRouter);


app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

// globale error handling middleware
app.use(globalErrorHandler);

mongoose
  .connect(process.env.CONNECT_STR)
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running ${port}`);
});
