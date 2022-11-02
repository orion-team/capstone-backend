import express from "express";
import { serve, setup } from "swagger-ui-express";
import * as schema from "../../schema.json";

import { favorite } from "./favorite";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send({ version: "0.0.1" });
});

router.use("/api-docs", serve);
router.get("/api-docs", setup(schema, { explorer: true }));

router.use("/favorite", favorite);
export default router;
