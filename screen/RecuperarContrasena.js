import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { RecuperarContrasenaEstilo } from "../styles/recuperarContrasenaEstilo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Error", "Por favor, introduce tu correo electrónico.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert(
        "Error",
        "Por favor, introduce un correo electrónico válido."
      );
      return;
    }
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        setEmailSent(true);
        setEmail("");
      })
      .catch((error) => {
        setLoading(false);
        let errorMessage =
          "No se pudo enviar el correo electrónico de restablecimiento de contraseña.";
        if (error.code === "auth/user-not-found") {
          errorMessage =
            "No se encontró una cuenta con ese correo electrónico.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "El correo electrónico no es válido.";
        }
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={RecuperarContrasenaEstilo.container}>
      <Image
        source={require("../images/LogoSinFondo.png")}
        style={RecuperarContrasenaEstilo.logoImage}
      />
      <Text style={RecuperarContrasenaEstilo.headerText}>
        Olvidé mi contraseña
      </Text>
      <TextInput
        placeholder="Correo electrónico"
        style={RecuperarContrasenaEstilo.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={RecuperarContrasenaEstilo.loginButton}
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={RecuperarContrasenaEstilo.buttonText}>
            Restablecer contraseña
          </Text>
        )}
      </TouchableOpacity>
      {emailSent && (
        <Text style={RecuperarContrasenaEstilo.successText}>
          Se ha enviado un correo electrónico de restablecimiento de contraseña
          a {email}. Por favor, revisa tu bandeja de entrada.
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword;
