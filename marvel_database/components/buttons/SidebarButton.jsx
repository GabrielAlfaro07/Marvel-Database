import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SidebarButton = ({ toggleSidebar, isOpen }) => {
  return (
    <View className="absolute top-2 left-2 z-50">
      <TouchableOpacity onPress={toggleSidebar} className="p-4">
        {/* Change color based on whether the sidebar is open */}
        <FontAwesomeIcon
          icon={faBars}
          color={isOpen ? "white" : "black"}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SidebarButton;
