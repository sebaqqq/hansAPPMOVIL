import { StyleSheet } from "react-native";

export const EditarUserStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    backgroundColor: "#ffffff",
    marginTop: "15%",
    borderRadius: 30,
    width: "90%",
    alignSelf: "center",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#090909",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  boton: {
    backgroundColor: "#4a7f8d",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
  },
});
