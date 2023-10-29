import express from "express";
import morgan from "morgan";
// Initialize server
const app = express();
const port = process.env.PORT || 3000;

// MultiRoute Middlewares
app.use(morgan("dev"));

app.listen(port, () => {
  console.log("Server ON: Start listening in " + port);
});
