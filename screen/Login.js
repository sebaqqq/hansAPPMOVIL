// Importaciones de módulos y librerías
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

// Definición del componente funcional Login
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

// Estilos del componente utilizando StyleSheet
const styles = StyleSheet.create({
  // Contenedor principal del componente
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  // Contenedor de desplazamiento
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  // Contenedor centrado
  centeredContainer: {
    alignItems: "center",
  },

  // Título principal
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#0077B6",
  },

  // Imagen del logotipo
  logoImage: {
    width: 300,
    height: 57,
    marginBottom: 40,
  },

  // Texto de encabezado
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },

  // Contenedor de entrada de usuario
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  // Contenedor de cada entrada de usuario
  inputWrapper: {
    position: "relative",
    marginBottom: 30,
  },

  // Icono para las entradas de usuario
  icon: {
    position: "absolute",
    left: 8,
    top: 12,
    zIndex: 1,
  },

  // Contenedor de etiqueta sobre la entrada de usuario
  labelContainer: {
    position: "absolute",
    top: 0,
    left: 4,
    zIndex: 1,
  },

  // Texto de etiqueta sobre la entrada de usuario
  labelText: {
    fontSize: 14,
  },

  // Entrada de usuario
  input: {
    marginBottom:30,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 8,
    paddingLeft: 40,
    color: "#333",
  },

  // Texto de error
  errorText: {
    color: "red",
    marginBottom: 10,
  },

  // Botón de inicio de sesión
  loginButton: {
    backgroundColor: "#0077B6",
    borderRadius: 20,
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },

  // Texto dentro del botón de inicio de sesión
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  showPasswordButton: {
    position: "absolute",
    right: 8,  // Ajusta la posición del ícono "eye" a la derecha
    top: 12,
    zIndex: 1,
  },
});

export default Login;
