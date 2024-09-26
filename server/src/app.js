import express from "express";
import apitest from "./routes/api.js";
import cors from "cors";
export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", apitest);
