<<<<<<< Updated upstream
import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image } from "react-native";
=======
import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
>>>>>>> Stashed changes
import "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
// import { useEffect } from "react";

<<<<<<< Updated upstream
function Login() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hans Motors</Text>

      <Image source={require('../images/car.png')} style={styles.logoImage} />

      <Text style={styles.heading}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setEmailFocused(true)}
          activeOpacity={1}
        >
          <Text style={emailFocused ? styles.labelFocused : styles.label}>
            Correo electrónico
          </Text>
          <TextInput
            placeholder=""
            style={styles.input}
            placeholderTextColor="#A0A0A0"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputWrapper}
          onPress={() => setPasswordFocused(true)}
          activeOpacity={1}
        >
          <Text style={passwordFocused ? styles.labelFocused : styles.label}>
            Contraseña
          </Text>
          <TextInput
            placeholder=""
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#A0A0A0"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </TouchableOpacity>
=======
function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        navigation.replace("HomeLogin");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        navigation.replace("HomeLogin");
      })
      .catch((error) => alert(error.message));
  }

  return (
    <View style={styles.padre}>
      <Text>Hans Motors</Text>
      <View style={styles.tarjeta}>
        <Text>Iniciar Sesión</Text>
        <TextInput 
          placeholder="Correo electronico" 
          style={styles.cajaTexto}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Contraseña" 
          style={styles.cajaTexto}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.padreBoton}>
          <TouchableOpacity 
            style={styles.boton}
            onPress={handleLogin}
          >
            <Text style={styles.botonTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
>>>>>>> Stashed changes
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
    width: 446, // Ajusta el ancho según tus necesidades
    height: 60,  // Ajusta la altura según tus necesidades
    marginBottom: 50,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,  // Ajusta el margen según tus necesidades
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
  inputWrapper: {
    position: "relative",
    marginBottom: 30,  // Ajusta el margen según tus necesidades
  },
  label: {
    position: "absolute",
    left: 15,
    top: 15,
    color: "#A0A0A0",
  },
  labelFocused: {
    position: "absolute",
    left: 15,
    top: 0,
    color: "#525FE1",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#525FE1",
    paddingVertical: 10,
    paddingLeft: 15,
    marginBottom: 20,  // Ajusta el margen según tus necesidades
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