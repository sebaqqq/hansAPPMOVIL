import { StyleSheet } from "react-native";

const PatenteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  searchBar: {
    margin: 10,
    backgroundColor: "#3a798b",
  },
  scrollContent: {
    flex: 1,
  },
  patenteItem: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedCard: {
    borderColor: "#4a7f8d",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(0, 0, 0)",
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
    color: "rgb(0, 0, 0)",
  },
  tomarButton: {
    justifyContent: "flex-end",
  },
  filterInput: {
    marginHorizontal: 10,
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
});

export default PatenteStyles;
