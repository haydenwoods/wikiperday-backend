import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";

import "@/queues/articles";

import router from "@/routes";

import { errorHandler, logErrors } from "@/middleware/errors";

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/wikiperday"

const app = express();

app.use(cors());
app.use(json());

app.use("/api/v1", router);

app.use(logErrors);
app.use(errorHandler);

mongoose.connect(MONGO_URL, { 
  useCreateIndex: true,
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Database connected");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
}); 