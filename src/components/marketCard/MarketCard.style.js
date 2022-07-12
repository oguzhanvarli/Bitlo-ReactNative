import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 2,
    marginBottom: 10,
    height: 60,
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowRadius: 1,
    elevation: 4,
  },
  marketCode: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 15,
  },
  currentQuote: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    marginEnd: 25,
  },
});
