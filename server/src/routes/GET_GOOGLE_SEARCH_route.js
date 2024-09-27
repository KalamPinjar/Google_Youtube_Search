import express from "express";
import { GET_GOOGLE_SEARCH } from "../controllers/GET_GOOGLE_SEARCH_controller.js";

const getGoogleSearch = express.Router();

getGoogleSearch.post("/", GET_GOOGLE_SEARCH);

export default getGoogleSearch;
