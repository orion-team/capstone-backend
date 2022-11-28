import express from "express";
import { body } from "express-validator";
import { postSingle } from "./post";
import { getAll } from "./get/getAll";
import { deleteSingle } from "./delete";

const router = express.Router();

router.get("/", getAll);

// return favorited object
router.post(
  "/",
  body("recipeId").notEmpty().isString().trim().escape(),
  postSingle
);

router.delete(
  "/",
  body("recipeId").notEmpty().isString().trim().escape(),
  deleteSingle
);

export default router;
