import express from "express";
import { usersController } from "../controllers";

const router = express.Router();

router.post("/", usersController.users_post);

router.get("/:id", usersController.users_get_one);

export default router;
