import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { postRouter, userRouter } from "./routes";
import mongoConnect from "./utils/connection";

mongoConnect().catch(() => console.log("Couldn't connect to MongoDB"));

// Initialize server
const app = express();
const port = process.env.PORT || 3000;

// MultiRoute Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Router middlewares
app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server ON: Start listening in " + port);
});
