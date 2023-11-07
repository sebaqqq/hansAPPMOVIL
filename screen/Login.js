import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image 
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
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
    setErrorMessage(""); // Clear previous error message
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;

        if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
          errorMessage = "El correo o la contraseña es incorrecto";
        }

        setErrorMessage(errorMessage); // Set the error message
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", paddingHorizontal: 20 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 36, fontWeight: "bold", marginBottom: 20, color: "#525FE1" }}>Hans Motors</Text>
          <Image source={require('../images/car.png')} style={{ width: 300, height: 47, marginBottom: 20 }} />

          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" }}>Iniciar Sesión</Text>
          <View style={{ width: "100%", marginBottom: 20 }}>
            <View style={{ position: "relative", marginBottom: 20 }}>
              <Icon name="envelope" size={20} color="#A0A0A0" style={{ position: "absolute", left: 8, top: 12, zIndex: 1 }} />
              <View style={{ position: "absolute", top: 8, left: 40, zIndex: 1 }}>
                <Text style={{ color: email.length > 0 ? "#525FE1" : "#A0A0A0" }}>Correo electrónico</Text>
              </View>
              <TextInput
                placeholder=""
                style={{ borderBottomWidth: 1, borderBottomColor: "#525FE1", paddingVertical: 8, paddingLeft: 40, color: "#333" }}
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View style={{ position: "relative", marginBottom: 20 }}>
              <Icon name="lock" size={20} color="#A0A0A0" style={{ position: "absolute", left: 8, top: 12, zIndex: 1 }} />
              <View style={{ position: "absolute", top: 8, left: 40, zIndex: 1 }}>
                <Text style={{ color: password.length > 0 ? "#525FE1" : "#A0A0A0" }}>Contraseña</Text>
              </View>
              <TextInput
                placeholder=""
                style={{ borderBottomWidth: 1, borderBottomColor: "#525FE1", paddingVertical: 8, paddingLeft: 40, color: "#333" }}
                secureTextEntry
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
          </View>
          {errorMessage !== "" && <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>}
          <TouchableOpacity style={{ backgroundColor: "#525FE1", borderRadius: 20, paddingVertical: 12, width: "80%", alignItems: "center", marginTop: 20 }} onPress={handleLogin}>
            <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Login;
