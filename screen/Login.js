// Componente Login:
// Este componente React Native proporciona una pantalla de inicio de sesión con campos para correo electrónico y contraseña.
// Características Principales:
// - Utiliza el estado para gestionar el correo electrónico, la contraseña, el mensaje de error y el estado de visualización de la contraseña.
// - Utiliza Firebase Authentication para realizar la autenticación por correo electrónico y contraseña.
// - Utiliza un efecto para redirigir al usuario a otra pantalla si ya está autenticado.
// - Utiliza un `ScrollView` y `KeyboardAvoidingView` para manejar la visualización del teclado en dispositivos iOS.
// - Muestra un mensaje de error en caso de fallo en la autenticación.
// - Utiliza íconos de FontAwesome para el icono de correo electrónico y contraseña.
// - Cambia el color del borde inferior de los campos de entrada y las etiquetas de acuerdo con su estado (focado o no).

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Election");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setErrorMessage("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;

        switch (errorCode) {
          case "auth/wrong-password":
          case "auth/user-not-found":
            errorMessage = "El correo o la contraseña es incorrecto";
            break;
          default:
            errorMessage = "Ocurrió un error al iniciar sesión";
            break;
        }
        setErrorMessage(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.centeredContainer}>
          <Text style={styles.title}>Hans Motors</Text>
          <Image
            source={require("../images/AutoSinFondo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.headerText}>Iniciar Sesión</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon
                name="envelope"
                size={20}
                color="#A0A0A0"
                style={styles.icon}
              />
              <TextInput
                placeholder=""
                style={[
                  styles.input,
                  {
                    borderBottomColor: emailFocused || email.length > 0 ? "#525FE1" : "#000",
                  },
                ]}
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)}
                value={email}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <View style={styles.labelContainer}>
                <Text
                  style={[
                    styles.labelText,
                    {
                      top: emailFocused || email.length > 0 ? -10 : 8,
                      left: 40,
                      color: emailFocused || email.length > 0 ? "#525FE1" : "#A0A0A0",
                    },
                  ]}
                >
                  Correo electrónico
                </Text>
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#A0A0A0" style={styles.icon} />
              <TextInput
                placeholder=""
                style={[
                  styles.input,
                  {
                    borderBottomColor: passwordFocused || password.length > 0 ? "#525FE1" : "#000",
                  },
                ]}
                secureTextEntry={!showPassword}
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setPassword(text)}
                value={password}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#A0A0A0"
                />
              </TouchableOpacity>
              <View style={styles.labelContainer}>
                <Text
                  style={[
                    styles.labelText,
                    {
                      top: passwordFocused || password.length > 0 ? -10 : 8,
                      left: 40,
                      color: passwordFocused || password.length > 0 ? "#525FE1" : "#A0A0A0",},
                  ]}
                >
                  Contraseña
                </Text>
              </View>
            </View>
          </View>
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
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
    color: "#0077B6",
  },

  logoImage: {
    width: 300,
    height: 57,
    marginBottom: 40,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0077B6",
  },

  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 30,
  },

  icon: {
    position: "absolute",
    left: 8,
    top: 12,
    zIndex: 1,
  },

  labelContainer: {
    position: "absolute",
    top: 0,
    left: 4,
    zIndex: 1,
  },

  labelText: {
    fontSize: 14,
  },

  input: {
    marginBottom:30,
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
    backgroundColor: "#0077B6",
    borderRadius: 20,
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
});

export default Login;
