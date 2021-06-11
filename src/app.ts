import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")))

app.use(router);

export { app };