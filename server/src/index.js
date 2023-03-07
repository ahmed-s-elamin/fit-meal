import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

//db configs
mongoose
  .connect("mongodb://0.0.0.0:27017/fit-meal")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3030;
app.listen(port, () => console.log("server running"));
