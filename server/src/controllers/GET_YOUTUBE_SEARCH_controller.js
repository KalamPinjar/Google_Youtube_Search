import "dotenv/config";
import axios from "axios";

export async function GET_YOUTUBE_SEARCH(req, res) {
  let input = req.body.q;

  if (!input) {
    res.status(400).json({ error: "No input provided" });
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.URL_YOUTUBE_SEARCH}?key=${process.env.GOOGLE_API_KEY}&part=id,snippet&maxResults=20&q=${input}&type=video`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error:
        error.response?.data || "An error occurred while fetching the results",
    });
  }
}
