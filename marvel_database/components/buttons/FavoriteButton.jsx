import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  toggleFavoriteStatus,
  checkFavoriteStatus,
} from "../../services/favoritesService";
import { fetchUserId } from "../../services/supabaseService"; // Import the fetchUserId function

const FavoriteButton = ({ itemId, itemType }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [userId, setUserId] = useState(null); // Store the user ID

  useEffect(() => {
    // Fetch the current logged-in user's ID
    const loadUserId = async () => {
      const id = await fetchUserId();
      setUserId(id);
    };

    loadUserId();
  }, []);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (userId) {
        const favorited = await checkFavoriteStatus(userId, itemId, itemType);
        setIsFavorited(favorited);
      }
    };

    if (userId) {
      fetchFavoriteStatus();
    }
  }, [userId, itemId, itemType]);

  const handleToggleFavorite = async () => {
    if (userId) {
      await toggleFavoriteStatus(userId, itemId, itemType);
      setIsFavorited((prev) => !prev);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggleFavorite}>
      <View className="p-4 bg-gray-600 border-white border-2 rounded-xl">
        <FontAwesomeIcon
          icon={faStar}
          size={32}
          color={isFavorited ? "yellow" : "gray"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
