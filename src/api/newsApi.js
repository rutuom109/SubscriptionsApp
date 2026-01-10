import axios from "axios";

const API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = "c9746ae045f0493fbe7126418a0eb6de";

export const getTopHeadlines = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: { country: "us", category: "business", apiKey: API_KEY },
    });
    return response.data.articles;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch news");
  }
};
