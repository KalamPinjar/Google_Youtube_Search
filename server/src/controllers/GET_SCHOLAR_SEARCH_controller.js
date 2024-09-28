import "dotenv/config";
import axios from "axios";

export async function GET_SCHOLAR_SEARCH(req, res) {
  let input = req.body.q;

  if (!input) {
    res.status(400).json({ error: "No input provided" });
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.URL_SCHOLAR_SEARCH}&q=${input}&api_key=${process.env.SCHOLAR_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error:
        error.response?.data || "An error occurred while fetching the results",
    });
  }
}
