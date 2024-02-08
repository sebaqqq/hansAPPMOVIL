import { StyleSheet } from 'react-native';

export const InventarioStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  inventarioItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 15,
    color: "#333333",
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
  cantidadBaja: {
    color: 'red',
  },
  cantidadMedia:{
    color: 'orange'
  },
  cantidadNormal: {
    color: '#333333',
  },
});