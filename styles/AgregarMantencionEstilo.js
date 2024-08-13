// import { StyleSheet } from "react-native";

// export const AgregarMantencionStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   textTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     paddingHorizontal: 8,
//   },
//   picker: {
//     flex: 1,
//   },
//   button: {
//     marginBottom: 16,
//     marginTop: 10,
//   },
//   botonTexto: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   errorText: {
//     color: "red",
//     marginVertical: 8,
//   },
//   mantencionItem: {
//     padding: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//     backgroundColor: "#f9f9f9",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   card: {
//     marginBottom: 16,
//     borderRadius: 8,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   confirmationModal: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   confirmationModalText: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   confirmationModalButton: {
//     color: "#007BFF",
//     fontSize: 16,
//     marginVertical: 5,
//   },
// });

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
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "#0077B6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
