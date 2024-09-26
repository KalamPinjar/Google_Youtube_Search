import express from "express";
import { test } from "../controllers/test.js";

const apitest = express.Router();

apitest.get("/", test);

export default apitest;
