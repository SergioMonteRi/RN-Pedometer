import { StyleSheet } from "react-native";

const RingProgressStyles = (radius: number, strokeWidth: number) => {
  return StyleSheet.create({
    container: {
      width: radius * 2,
      height: radius * 2,
      alignSelf: "center",
    },
    arrow: {
      position: "absolute",
      alignSelf: "center",
      top: strokeWidth * 0.1
    }
  });
};

export default RingProgressStyles;
