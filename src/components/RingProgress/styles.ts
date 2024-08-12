import { StyleSheet } from "react-native";

const RingProgressStyles = (radius: number) => {
  return StyleSheet.create({
    container: {
      width: radius * 2,
      height: radius * 2,
      alignSelf: "center",
    },
  });
};

export default RingProgressStyles;
