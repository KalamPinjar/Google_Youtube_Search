import express from "express";
import { GET_SCHOLAR_SEARCH } from "../controllers/GET_SCHOLAR_SEARCH_controller.js";

const getScholarSearch = express.Router();

getScholarSearch.post("/", GET_SCHOLAR_SEARCH);

export default getScholarSearch;
