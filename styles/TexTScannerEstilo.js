import { StyleSheet } from "react-native";

export const TexTScannerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },
  label: {
    fontSize: 25,
    color: "black",
    marginBottom: 60,
    padding: 35,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#0077B6",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
