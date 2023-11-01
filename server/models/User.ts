import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  },
});

const SALT_FACTOR = 10;

// Hash a password on save
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, SALT_FACTOR, async (err, hashedPassword) => {
    if (err) return next(err);

    // Override string with the hashed one
    this.password = hashedPassword;
    next();
  });
});

const User = mongoose.model("user", userSchema);

export default User;
