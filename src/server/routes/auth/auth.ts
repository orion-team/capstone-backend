import express from "express";
import { body } from "express-validator";
import { deleteLogin } from "./deleteLogin";
import { getUser } from "./getUser";
import { postLogin } from "./postLogin";

const router = express();

router.post(
  "/login",
  body("token").notEmpty().isString().trim().escape(),
  postLogin
);

router.delete("/login", deleteLogin);
router.get("/user", getUser);

export default router;
