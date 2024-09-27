import express from "express";
import { GET_YOUTUBE_SEARCH } from "../controllers/GET_YOUTUBE_SEARCH_controller.js";

const getYoutubeSearch = express.Router();

getYoutubeSearch.post("/", GET_YOUTUBE_SEARCH);

export default getYoutubeSearch;
