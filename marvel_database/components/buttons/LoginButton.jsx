import React, { useState } from "react";
import { TextInput, View, Button, Text } from "react-native";
import {
  loginUser,
  signUpUser,
  fetchUserProfile,
} from "../../services/supabaseService";

const LoginButton = ({ setUser, setProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    // Try logging in
    let { user, error } = await loginUser(email, password);

    // If login fails due to invalid credentials, try signing up
    if (error && error.message === "Invalid login credentials") {
      console.log("User not found, signing up new user...");
      const signUpResult = await signUpUser(email, password);
      user = signUpResult.user;
      error = signUpResult.error;
    }

    if (error) {
      setError(error.message); // Set error message
    } else if (user) {
      setError(null);
      setUser(user);

      // Fetch the user's profile after successful login/sign-up
      const { data } = await fetchUserProfile(user.id);
      setProfile(data);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-white rounded-lg shadow-lg">
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded p-2 mb-4"
      />
      <Button title="Login" onPress={handleLogin} />
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
};

export default LoginButton;
