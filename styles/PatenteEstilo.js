import { StyleSheet } from "react-native";

const PatenteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  filterInput: {
    marginBottom: 15,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  patenteItem: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  selectedPatente: {
    borderWidth: 2,
    borderColor: "#004080",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  tomarButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 5,
  },
  selectedCard: {
    backgroundColor: "#F5F5F5",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeModal: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default PatenteStyles;
