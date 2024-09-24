import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Helper function to generate the auth parameters (timestamp, public key, and hash)
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return `ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

// Function to fetch series with dynamic offset and limit
export const fetchSeries = async (offset, limit) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series?${authParams}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error("Error fetching series:", error);
    return [];
  }
};

// Function to get the information of a specific series by ID
export const fetchSeriesById = async (seriesId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series/${seriesId}?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error(`Error fetching series ${seriesId}:`, error);
    return null;
  }
};

// Function to get a specific series' characters
export const fetchSeriesCharacters = async (seriesId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series/${seriesId}/characters?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching characters for series ${seriesId}:`, error);
    return [];
  }
};

// Function to get a specific series' comics
export const fetchSeriesComics = async (seriesId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series/${seriesId}/comics?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching comics for series ${seriesId}:`, error);
    return [];
  }
};

// Function to get a specific series' creators
export const fetchSeriesCreators = async (seriesId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series/${seriesId}/creators?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching creators for series ${seriesId}:`, error);
    return [];
  }
};

// Function to get a specific series' events
export const fetchSeriesEvents = async (seriesId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series/${seriesId}/events?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching events for series ${seriesId}:`, error);
    return [];
  }
};

// Function to get a specific series' stories
export const fetchSeriesStories = async (seriesId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/series/${seriesId}/stories?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching stories for series ${seriesId}:`, error);
    return [];
  }
};
