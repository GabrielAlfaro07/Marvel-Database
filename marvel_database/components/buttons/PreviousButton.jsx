import React from "react";
import { Button } from "react-native";

const PreviousButton = ({ offset, setOffset, limit }) => {
  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  return (
    <Button title="Previous" onPress={handlePrevious} disabled={offset === 0} />
  );
};

export default PreviousButton;
