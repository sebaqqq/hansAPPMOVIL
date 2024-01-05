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
  Alert
} from "react-native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
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

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Alert.alert("Bienvenido");
    })
    .catch(error => {
      console.log(error);
      Alert.alert('Correo o Contraseña incorrectos');
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Election");
      }
    });
    return unsubscribe;
  }, []);

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
