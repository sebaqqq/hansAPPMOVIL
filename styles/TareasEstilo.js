import { StyleSheet } from "react-native";

export const TareasStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tareaTomadaItem: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },
  tareaTomadaTextContainer: {
    padding: 10,
  },
  tareaTomadaText: {
    fontSize: 16,
    marginVertical: 2,
  },
  productContainer: {
    marginTop: 5,
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "40%",
  },
  confirmationModal: {
    width: "100%",
  },
  confirmationModalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  confirmationModalButton: {
    marginVertical: 5,
    width: "100%",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
  },
});
