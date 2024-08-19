import { StyleSheet } from "react-native";

export const InventarioStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#3a798b",
  },
  inventarioItem: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  cantidadBaja: {
    color: "#e74c3c",
  },
  cantidadMedia: {
    color: "#f39c12",
  },
  cantidadNormal: {
    color: "#2ecc71",
  },
});
