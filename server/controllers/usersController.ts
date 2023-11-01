import { body, validationResult } from "express-validator";
import jsonTemplate from "../utils/jsonTemplate";
import asyncHand from "express-async-handler";
import User from "../models/User";

const controller = (function () {
  const users_post = [
    body("username")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("Username must be at least 5 characters long and 20 at max")
      .custom(async (input) => {
        const user = await User.findOne({ username: input });
        return user === null;
      })
      .withMessage("Username is already taken, please use another one"),
    body(
      "password",
      "Password should be a combination of one uppercase, one lowercase , min 5 characters"
    )
      .trim()
      .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1 }),
    body("dbl_password", "Passwords do not match").custom((input, meta) => {
      return input !== meta.req.body.password;
    }),
    asyncHand(async (req, res) => {
      // Check for errors
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.json(jsonTemplate({ data: errors.array() }));
        return;
      }
      // There are no errors, add user to db
      const user = new User({
        username: req.body.username,
        password: req.body.password,
      });

      await user.save();
      res.json(jsonTemplate({ data: user }));
    }),
  ];

  const users_get_one = asyncHand(async (req, res) => {
    // Check if user exists
    const user = await User.findById(req.params.id);

    if (user === null) {
      res.json(
        jsonTemplate({
          status: "error",
          message: "User doesn't exists",
        })
      );
      return;
    }

    res.json(
      jsonTemplate({
        data: user,
      })
    );
  });

  return {
    users_post,
    users_get_one,
  };
})();

export default controller;
