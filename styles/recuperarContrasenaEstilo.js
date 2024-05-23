import { StyleSheet } from "react-native";

export const RecuperarContrasenaEstilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0077B6",
    textAlign: "center",
  },
  logoImage: {
    width: 300,
    height: 120,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0077B6",
    textAlign: "center",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  inputWrapper: {
    position: "relative",
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    left: 8,
    top: 12,
  },
  labelContainer: {
    position: "absolute",
    top: 0,
    left: 4,
  },
  labelText: {
    fontSize: 14,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 8,
    paddingLeft: 40,
    color: "#333",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#0077B6",
    borderRadius: 10,
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  showPasswordButton: {
    position: "absolute",
    right: 8,
    top: 12,
    zIndex: 1,
  },
  forgotPasswordText: {
    color: "#1C2120",
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginTop: 20,
    textAlign: "center",
    width: "80%",
  },
});
