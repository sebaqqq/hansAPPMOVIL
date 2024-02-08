import { StyleSheet } from 'react-native';

export const TareasStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  tareaTomadaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
  },
  tareaTomadaTextContainer: {
    flex: 1,
  },
  tareaTomadaText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
  confirmationModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Añadido para centrar verticalmente
    flex: 1, // Añadido para ocupar todo el espacio disponible
  },
  confirmationModalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationModalButton: {
    fontSize: 16,
    color: 'blue',
    marginVertical: 10,
    textAlign: 'center',
  },
});
