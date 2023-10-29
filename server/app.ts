import express from "express";
import morgan from "morgan";
import "dotenv/config";
import { postRouter } from "./routes";
// Initialize server
const app = express();
const port = process.env.PORT || 3000;

// MultiRoute Middlewares
app.use(morgan("dev"));

// Router middlewares
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log("Server ON: Start listening in " + port);
});
