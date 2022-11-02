import express from "express";
import { body } from "express-validator";
import { postSingle } from "./post";
import { getAll } from "./get/getAll";

const router = express.Router();

router.get("/", getAll);

// return favorited object
router.post(
  "/",
  body("title").notEmpty().isString().trim().escape(),
  body("url").notEmpty().isString().trim().escape(),
  body("imageURL").optional().isString().trim().escape(),
  postSingle
);

export default router;
