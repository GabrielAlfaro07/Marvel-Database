import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SidebarButton = ({ toggleSidebar }) => {
  return (
    <View>
      <TouchableOpacity onPress={toggleSidebar} className="p-4 bg-gray-800">
        <FontAwesomeIcon icon={faBars} color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SidebarButton;
