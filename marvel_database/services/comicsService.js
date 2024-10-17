import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Helper function to generate the auth parameters (timestamp, public key, and hash)
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return `ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

// Function to fetch comics with dynamic offset and limit
export const fetchComics = async (offset, limit) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/comics?${authParams}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of comics
  } catch (error) {
    console.error("Error fetching comics:", error);
    return [];
  }
};

// Function to get the information of a specific comic by ID
export const fetchComicById = async (comicId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/comics/${comicId}?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0]; // Return the comic information
  } catch (error) {
    console.error(`Error fetching comic ${comicId}:`, error);
    return null;
  }
};

// Function to get a specific comic's characters
export const fetchComicCharacters = async (comicId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/comics/${comicId}/characters?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of characters
  } catch (error) {
    console.error(`Error fetching characters for comic ${comicId}:`, error);
    return [];
  }
};

// Function to get a specific comic's creators
export const fetchComicCreators = async (comicId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/comics/${comicId}/creators?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of creators
  } catch (error) {
    console.error(`Error fetching creators for comic ${comicId}:`, error);
    return [];
  }
};

// Function to get a specific comic's events
export const fetchComicEvents = async (comicId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/comics/${comicId}/events?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of creators
  } catch (error) {
    console.error(`Error fetching events for comic ${comicId}:`, error);
    return [];
  }
};

// Function to get a specific comic's stories
export const fetchComicStories = async (comicId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/comics/${comicId}/stories?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of stories
  } catch (error) {
    console.error(`Error fetching stories for comic ${comicId}:`, error);
    return [];
  }
};
