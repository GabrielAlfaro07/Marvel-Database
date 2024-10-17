import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Helper function to generate the auth parameters (timestamp, public key, and hash)
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return `ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

// Function to fetch creators with dynamic offset and limit
export const fetchCreators = async (offset, limit) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/creators?${authParams}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error("Error fetching creators:", error);
    return [];
  }
};

// Function to get the information of a specific creator by ID
export const fetchCreatorById = async (creatorId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/creators/${creatorId}?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error(`Error fetching creator ${creatorId}:`, error);
    return null;
  }
};

// Function to get a specific creator's comics
export const fetchCreatorComics = async (creatorId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/creators/${creatorId}/comics?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching comics for creator ${creatorId}:`, error);
    return [];
  }
};

// Function to get a specific creator's events
export const fetchCreatorEvents = async (creatorId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/creators/${creatorId}/events?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching events for creator ${creatorId}:`, error);
    return [];
  }
};

// Function to get a specific creator's series
export const fetchCreatorSeries = async (creatorId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/creators/${creatorId}/series?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching series for creator ${creatorId}:`, error);
    return [];
  }
};

// Function to get a specific creator's stories
export const fetchCreatorStories = async (creatorId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/creators/${creatorId}/stories?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching stories for creator ${creatorId}:`, error);
    return [];
  }
};
