import { supabase } from "../supabaseClient";

// Function to check if an item is favorited
export const checkFavoriteStatus = async (userId, itemId, itemType) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("item_id", itemId)
    .eq("item_type", itemType)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking favorite status:", error.message);
  }

  return !!data; // Returns true if favorite exists, false otherwise
};

// Function to toggle favorite status
export const toggleFavoriteStatus = async (userId, itemId, itemType) => {
  const favorited = await checkFavoriteStatus(userId, itemId, itemType);

  if (favorited) {
    // If already favorited, remove the favorite
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("item_id", itemId)
      .eq("item_type", itemType);

    if (error) {
      console.error("Error removing favorite:", error.message);
    }
  } else {
    // If not favorited, add to favorites
    const { error } = await supabase.from("favorites").insert([
      {
        user_id: userId,
        item_id: itemId,
        item_type: itemType,
      },
    ]);

    if (error) {
      console.error("Error adding favorite:", error.message);
    }
  }
};

// Function to fetch all favorites of a certain type (e.g., characters, series)
export const fetchFavoritesByType = async (userId, itemType) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("item_id")
    .eq("user_id", userId)
    .eq("item_type", itemType);

  if (error) {
    console.error(`Error fetching favorites for ${itemType}:`, error.message);
  }

  return data ? data.map((item) => item.item_id) : [];
};

// Fetch all favorite items (characters, series, events, etc.)
export const fetchAllFavorites = async (userId) => {
  const types = ["character", "series", "creator", "event", "comic", "story"];

  const promises = types.map(async (type) => {
    const ids = await fetchFavoritesByType(userId, type);
    return { type, ids };
  });

  const result = await Promise.all(promises);

  // Format result into an object with each type as a key
  return result.reduce((acc, { type, ids }) => {
    acc[type] = ids;
    return acc;
  }, {});
};
