import { StyleSheet } from 'react-native';

export const PatenteStyles = StyleSheet.create({
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
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  content: {
    marginTop: 8,
  },
  patenteItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
  },
  patenteText: {
    fontSize: 26,
    color: "#fff",
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  status: {
    fontSize: 14,
    padding: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
    color: "#fff",
    right: 12
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1,
  },
  tarjeta: {
    padding: 20,
    zIndex: 2,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  scrollContent: {
    paddingBottom: 100, // Ajusta este valor según sea necesario
    borderRadius: 10,
  },
  tomarTarea: {
    backgroundColor: "#4CAF50", // Color de fondo del botón
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  textTomarTarea: {
    color: "#fff", // Color del texto del botón
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  closeModal: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});