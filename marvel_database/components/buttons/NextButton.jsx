import React from "react";
import { Button } from "react-native";

const NextButton = ({ offset, setOffset, limit }) => {
  const handleNext = () => {
    setOffset(offset + limit);
  };

  return <Button title="Next" onPress={handleNext} />;
};

export default NextButton;
