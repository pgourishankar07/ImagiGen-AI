import * as dotenv from "dotenv";
import { createError } from "../error.js";
import axios from "axios";

dotenv.config();

// Setup API Ninja key
const apiKey = process.env.API_NINJA_KEY;

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { category } = req.body;

    const response = await axios.get(
      `https://api.api-ninjas.com/v1/randomimage`,
      {
        headers: {
          "X-Api-Key": apiKey,
          Accept: "image/jpg",
        },
        params: {
          category,
        },
        responseType: "arraybuffer", // To handle binary data (image)
      }
    );

    const generatedImage = Buffer.from(response.data, "binary").toString(
      "base64"
    );
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.message || error.message
      )
    );
  }
};
