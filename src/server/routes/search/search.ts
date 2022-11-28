import express from "express";
import { param } from "express-validator";
import { searchById } from "./get";
import { searchAll } from "./get/searchAll";

const router = express.Router();

// TODO add custom validator
router.get("/", searchAll);

router.get(
  "/:recipeId",
  param("recipeId").notEmpty().trim().escape(),
  searchById
);

export default router;
