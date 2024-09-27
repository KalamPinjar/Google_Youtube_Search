import express from "express";
import getGoogleSearch from "./routes/GET_GOOGLE_SEARCH_route.js";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import getYoutubeSearch from "./routes/GET_YOUTUBE_SEARCH_route.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use("/googleSearch", getGoogleSearch);
app.use("/youtubeSearch", getYoutubeSearch);
