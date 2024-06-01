import { StyleSheet } from "react-native";

export const AgregarAutomovilStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 8,
    margin: 8,
    width: 300,
  },
  button: {
    backgroundColor: "#0077B6",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: 300,
  },
  titulo: {
    fontSize: 28,
    marginBottom: 12,
  },
  nombreCategoria: {
    fontSize: 18,
    marginBottom: 4,
  },
  pickerContainer: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    width: "80%",
    overflow: "hidden",
    marginBottom: 12,
  },
  picker: {
    height: 40,
    width: "80%",
    color: "#333",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  confirmationModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmationModalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmationModalButton: {
    fontSize: 16,
    color: "blue",
    marginVertical: 10,
    textAlign: "center",
  },
});
