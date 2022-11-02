require("dotenv").config();
import { Server } from "./server/Server";
import express from "express";

const main = () => {
  const app = express();
  const port = parseInt(process.env.PORT) || 80;
  const server = new Server(app);
  server.start(port);
};

main();
