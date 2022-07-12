import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tableContainer: {
    marginBottom: 20,
  },
  header: {
    fontWeight: "900",
    fontSize: 14,
  },
  askPrice: {
    color: "#32CD32",
    maxWidth: 110,
  },
  bidPrice: {
    color: "red",
    maxWidth: 110,
  },
  askBackground: {
    position: "absolute",
    right: 0,
    marginTop: 4,
    marginRight: -15,
    height: 40,
    backgroundColor: "rgba(0,128,0,0.15)",
    //width: 100,
    maxWidth : 130
  },
  bidBackground: {
    position: "absolute",
    left: 0,
    marginTop: 4,
    marginLeft: -15,
    height: 40,
    backgroundColor: "rgba(255,0,0,0.15)",
    maxWidth: 130,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
