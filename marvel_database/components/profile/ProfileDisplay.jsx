import React from "react";
import { View, Text, Image } from "react-native";
import LogoutButton from "../buttons/LogoutButton";

const ProfileDisplay = ({ user, profile, setUser, setProfile }) => {
  return (
    <View className="flex items-center bg-gray-50 rounded-3xl pt-4 px-4 shadow-md w-64">
      {profile?.avatar_url ? (
        <Image
          source={{ uri: profile.avatar_url }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
          className="mb-4"
        />
      ) : (
        <Text>No Avatar</Text>
      )}
      <Text className="text-xl font-bold">
        {profile?.username || "Anonymous"}
      </Text>
      <Text className="text-gray-600 text-base">
        {profile?.email || "No Email"}
      </Text>
      <LogoutButton setUser={setUser} setProfile={setProfile} />
    </View>
  );
};

export default ProfileDisplay;
