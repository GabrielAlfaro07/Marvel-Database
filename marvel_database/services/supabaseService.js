import { supabase } from "../supabaseClient";

// Function to check if a user is logged in
export const checkUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return data?.user; // Returns the user if authenticated
};

// Function to create a user profile for first-time users
const createUserProfile = async (userId, email) => {
  const { error } = await supabase.from("profiles").insert([
    { id: userId, email, username: "New User" }, // You can add default values here
  ]);

  if (error) {
    console.error("Error creating user profile:", error.message);
  }

  return { error };
};

// Function to sign up a new user (via email/password)
export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  const user = data?.user;

  if (error) {
    console.error("Error signing up:", error.message);
  } else if (user) {
    // Create a profile for new users
    const { error: profileCreationError } = await createUserProfile(
      user.id,
      email
    );
    if (profileCreationError) {
      console.error(
        "Error creating profile for new user:",
        profileCreationError.message
      );
    }
  }

  return { user, error };
};

// Function to sign in an existing user (via email/password)
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const user = data?.user;

  if (error) {
    console.error("Error logging in:", error.message);
  } else if (user) {
    // Check if the user profile exists in the database
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // If profile doesn't exist, create one (first time login)
    if (!profileData && !profileError) {
      console.log("Creating new profile for first-time user");
      const { error: profileCreationError } = await createUserProfile(
        user.id,
        email
      );
      if (profileCreationError) {
        console.error(
          "Error creating profile for new user:",
          profileCreationError.message
        );
      }
    }
  }

  return { user, error };
};

// Function to sign out the user
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
  }

  return { error };
};

// Fetch user profile (username, email, avatar_url)
export const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("username, email, avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
  }

  return { data, error };
};
