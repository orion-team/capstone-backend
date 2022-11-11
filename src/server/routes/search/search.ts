import express from "express";
import { query } from "express-validator";
import { search } from "./get";

const router = express.Router();

router.get("/", query("q").notEmpty().isString().trim().escape(), search);

export default router;
