import express from "express";
// Initialize server
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server ON: Start listening in " + port);
});
