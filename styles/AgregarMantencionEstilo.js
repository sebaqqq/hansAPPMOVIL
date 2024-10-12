import { StyleSheet } from "react-native";

export const AgregarMantencionStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  picker: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0077B6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0077B6",
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#0077B6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalPatente: {
    flex: 1,
    margin: 0,
  },
  ModalIA: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  ModalIATitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ModalIAText: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
  },
});
