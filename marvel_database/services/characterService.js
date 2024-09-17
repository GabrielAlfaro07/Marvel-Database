import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Function to fetch characters with dynamic offset and limit
export const fetchCharacters = async (offset, limit) => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

  const url = `${API_BASE_URL}/v1/public/characters?ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of characters
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};
