import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import getGoogleSearch from "./routes/GET_GOOGLE_SEARCH_route.js";
import getYoutubeSearch from "./routes/GET_YOUTUBE_SEARCH_route.js";
import getScholarSearch from "./routes/GET_SCHOLAR_SEARCH_route.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/googleSearch", getGoogleSearch);
app.use("/youtubeSearch", getYoutubeSearch);
app.use("/scholarSearch", getScholarSearch);
