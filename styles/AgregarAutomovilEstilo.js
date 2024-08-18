import { StyleSheet } from "react-native";

export const AgregarAutomovilStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  nombreCategoria: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3a798b", // Puedes usar el color hex que prefieras
  },
  confirmationModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmationModalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmationModalButton: {
    fontSize: 16,
    color: "#007bff", // Puedes usar el color hex que prefieras
    marginVertical: 10,
  },
});
