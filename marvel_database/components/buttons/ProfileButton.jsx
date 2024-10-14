import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { checkUser, fetchUserProfile } from "../../services/supabaseService";
import ProfileDisplay from "../profile/ProfileDisplay";
import LoginButton from "./LoginButton";

const ProfileButton = () => {
  const [user, setUser] = useState(null); // To store user info
  const [profile, setProfile] = useState(null); // To store profile data
  const [showProfile, setShowProfile] = useState(false); // To toggle profile view

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const currentUser = await checkUser();
      if (isMounted) {
        setUser(currentUser);
        if (currentUser) {
          const { data } = await fetchUserProfile(currentUser.id);
          setProfile(data);
        }
      }
    };

    fetchUser();

    // Clean-up function
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View className="absolute top-2 right-2 z-50 flex items-center">
      <TouchableOpacity
        onPress={() => setShowProfile(!showProfile)}
        className="p-4"
      >
        <FontAwesomeIcon icon={faUser} size={24} />
      </TouchableOpacity>
      {showProfile && (
        <View className="absolute top-12 right-0 bg-white rounded-lg w-64">
          {user ? (
            <ProfileDisplay
              user={user}
              profile={profile}
              setUser={setUser}
              setProfile={setProfile}
            />
          ) : (
            <LoginButton setUser={setUser} setProfile={setProfile} />
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileButton;
