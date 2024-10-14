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
