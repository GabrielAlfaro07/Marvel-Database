import { API_BASE_URL, MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from "@env";
import md5 from "md5";

// Helper function to generate the auth parameters (timestamp, public key, and hash)
const generateAuthParams = () => {
  const timestamp = Date.now().toString();
  const hash = md5(timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);
  return `ts=${timestamp}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;
};

// Function to fetch events with dynamic offset and limit
export const fetchEvents = async (offset, limit) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events?${authParams}&offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// Function to get the information of a specific event by ID
export const fetchEventById = async (eventId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events/${eventId}?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    return null;
  }
};

// Function to get a specific event's characters
export const fetchEventCharacters = async (eventId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events/${eventId}/characters?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching characters for event ${eventId}:`, error);
    return [];
  }
};

// Function to get a specific event's comics
export const fetchEventComics = async (eventId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events/${eventId}/comics?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching comics for event ${eventId}:`, error);
    return [];
  }
};

// Function to get a specific event's creators
export const fetchEventCreators = async (eventId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events/${eventId}/creators?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching creators for event ${eventId}:`, error);
    return [];
  }
};

// Function to get a specific event's series
export const fetchEventSeries = async (eventId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events/${eventId}/series?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching series for event ${eventId}:`, error);
    return [];
  }
};

// Function to get a specific event's stories
export const fetchEventStories = async (eventId) => {
  const authParams = generateAuthParams();
  const url = `${API_BASE_URL}/v1/public/events/${eventId}/stories?${authParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error(`Error fetching stories for event ${eventId}:`, error);
    return [];
  }
};
