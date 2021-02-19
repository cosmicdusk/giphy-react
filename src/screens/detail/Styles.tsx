import { StyleSheet, useWindowDimensions } from "react-native";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
  },
  space: {
    flex: 0.01,
  },
  info: {
    width: "90%",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    color: "cyan",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 5,
    textAlign: "center",
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 5,
    textAlign: "center",
  },
});

export { styles };
