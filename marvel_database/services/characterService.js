import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Helper function to generate the auth parameters (timestamp, public key, and hash)
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return `ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

// Function to fetch characters with dynamic offset and limit
export const fetchCharacters = async (offset, limit) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/characters?${authParams}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of characters
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

// 1. Function to get the information of a specific character by ID
export const fetchCharacterById = async (characterId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/characters/${characterId}?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0]; // Return the character information
  } catch (error) {
    console.error(`Error fetching character ${characterId}:`, error);
    return null;
  }
};

// 2. Function to get a specific character's comics
export const fetchCharacterComics = async (characterId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/characters/${characterId}/comics?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of comics
  } catch (error) {
    console.error(`Error fetching comics for character ${characterId}:`, error);
    return [];
  }
};

// 3. Function to get a specific character's events
export const fetchCharacterEvents = async (characterId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/characters/${characterId}/events?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of events
  } catch (error) {
    console.error(`Error fetching events for character ${characterId}:`, error);
    return [];
  }
};

// 4. Function to get a specific character's series
export const fetchCharacterSeries = async (characterId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/characters/${characterId}/series?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of series
  } catch (error) {
    console.error(`Error fetching series for character ${characterId}:`, error);
    return [];
  }
};

// 5. Function to get a specific character's stories
export const fetchCharacterStories = async (characterId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/characters/${characterId}/stories?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results; // Return the list of stories
  } catch (error) {
    console.error(
      `Error fetching stories for character ${characterId}:`,
      error
    );
    return [];
  }
};
