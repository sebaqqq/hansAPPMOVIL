import React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from "react-native";
import "react-native-gesture-handler";

function Login() {
  return (
    <View style={styles.container}>
      <Image source={require('../images/car.png')} style={styles.logoImage} />

      <Text style={styles.logo}>Hans Motors</Text>
      <Text style={styles.heading}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#A0A0A0"
        />
      </View>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 150, // Ajusta el ancho según tus necesidades
    height: 150, // Ajusta la altura según tus necesidades
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#525FE1",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#525FE1",
    paddingVertical: 10,
    marginBottom: 10,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#525FE1",
    borderRadius: 30,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
