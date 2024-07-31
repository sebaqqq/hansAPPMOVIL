import { StyleSheet } from "react-native";

export const AgregarMantencionStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  picker: {
    flex: 1,
  },
  button: {
    marginBottom: 16,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginVertical: 8,
  },
  mantencionItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 2, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  confirmationModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmationModalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmationModalButton: {
    color: "#007BFF",
    fontSize: 16,
    marginVertical: 5,
  },
});
