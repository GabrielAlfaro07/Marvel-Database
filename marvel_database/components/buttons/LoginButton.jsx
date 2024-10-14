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
  const [username, setUsername] = useState(""); // New state for username in Sign Up mode
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up modes

  const handleLogin = async () => {
    let user;
    let error;

    if (isSignUp) {
      // If in sign-up mode, sign up the user with email, password, and username
      const signUpResult = await signUpUser(email, password, username);
      user = signUpResult.user;
      error = signUpResult.error;
    } else {
      // Otherwise, handle login
      const loginResult = await loginUser(email, password);
      user = loginResult.user;
      error = loginResult.error;
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

      {isSignUp && (
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
      )}

      <Button
        title={isSignUp ? "Create Account" : "Login"}
        onPress={handleLogin}
      />

      {/* Toggle between Login and Sign Up modes */}
      <Button
        title={isSignUp ? "Already have an account? Login" : "Create Account"}
        onPress={() => setIsSignUp(!isSignUp)}
      />

      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
};

export default LoginButton;
