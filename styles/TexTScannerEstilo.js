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
  barcodeContainer: {
    width: 500, // Cambia este valor para ajustar el ancho del scanner
    height: 500, // Cambia este valor para ajustar el alto del scanner
    top: "-3%",
  },
  label: {
    fontSize: 25,
    color: "black",
    padding: 35,
    fontWeight: "bold",
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
