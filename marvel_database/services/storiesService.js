import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Helper function to generate the auth parameters (timestamp, public key, and hash)
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return `ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

// Function to fetch stories with dynamic offset and limit
export const fetchStories = async (offset, limit) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories?${authParams}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
};

// Function to get the information of a specific story by ID
export const fetchStoryById = async (storyId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories/${storyId}?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error(`Error fetching story ${storyId}:`, error);
    return null;
  }
};

// Function to get a specific story's characters
export const fetchStoryCharacters = async (storyId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories/${storyId}/characters?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching characters for story ${storyId}:`, error);
    return [];
  }
};

// Function to get a specific story's comics
export const fetchStoryComics = async (storyId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories/${storyId}/comics?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching comics for story ${storyId}:`, error);
    return [];
  }
};

// Function to get a specific story's creators
export const fetchStoryCreators = async (storyId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories/${storyId}/creators?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching creators for story ${storyId}:`, error);
    return [];
  }
};

// Function to get a specific story's events
export const fetchStoryEvents = async (storyId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories/${storyId}/events?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching events for story ${storyId}:`, error);
    return [];
  }
};

// Function to get a specific story's series
export const fetchStorySeries = async (storyId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/stories/${storyId}/series?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching series for story ${storyId}:`, error);
    return [];
  }
};
