import React from "react";
import { Button } from "react-native";
import { logoutUser } from "../../services/supabaseService";

const LogoutButton = ({ setUser, setProfile }) => {
  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <View className="p-4">
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;
