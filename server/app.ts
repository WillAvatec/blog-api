import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { postRouter, userRouter } from "./routes";
import mongoConnect from "./utils/connection";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./models";
import bcrypt from "bcryptjs";
import session from "express-session";

mongoConnect().catch(() => console.log("Couldn't connect to MongoDB"));

// Configure passport strategy
passport.use(
  "local",
  new Strategy(async (username, password, done) => {
    const user = await User.findOne({ username });

    if (user === null) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // Passwords do not match
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Initialize server
const app = express();
const port = process.env.PORT || 3000;

// MultiRoute Middlewares
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_PASS,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Router middlewares
app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server ON: Start listening in " + port);
});
