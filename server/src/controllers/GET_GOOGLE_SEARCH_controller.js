import "dotenv/config";
import axios from "axios";

export async function GET_GOOGLE_SEARCH(req, res) {
  let input = req.body.q;
  let start = req.body.start;

  if (!input) {
    res.status(400).json({ error: "No input provided" });
    return;
  }

  // Default to page 1 if no start value or if it's invalid
  if (!start ) {
    start = 1;
  }

  try {
    const response = await axios.get(
      `${process.env.URL_GOOGLE_SEARCH}?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=${input}&num=10&start=${start}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || "An error occurred while fetching the results",
    });
  }
}
