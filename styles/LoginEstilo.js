import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  centeredContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#4a7f8d",
  },
  logoImage: {
    width: 300,
    height: 155,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a7f8d",
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
    width: "100%",
    backgroundColor: "#ffff",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 8,
    paddingLeft: 40,
    color: "#333",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#4a7f8d",
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
  },
});
