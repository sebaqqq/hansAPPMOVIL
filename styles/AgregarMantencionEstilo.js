import { StyleSheet } from "react-native";

export const AgregarMantencionStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    height: 40,
    width: "80%",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: "#333",
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
  button: {
    marginTop: 20,
    backgroundColor: "#0077B6",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  mantencionItem: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
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
