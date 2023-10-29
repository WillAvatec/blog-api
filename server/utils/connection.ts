import mongoose from "mongoose";

export default async function mongoConnect() {
  console.log("Attempting connection to DB...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Successfully Connected to DB");
}
