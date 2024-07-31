import React, { useState } from "react";
import { Text, View, Alert, ActivityIndicator, Image } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { RecuperarContrasenaEstilo } from "../styles/recuperarContrasenaEstilo";
import { Button, TextInput } from "react-native-paper";

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
        label="Correo electrónico"
        mode="flat"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={RecuperarContrasenaEstilo.input}
        keyboardType="email-address"
      />
      <Button
        mode="contained"
        style={{ width: 300, marginTop: 20, backgroundColor: "#0077B6" }}
        // style={RecuperarContrasenaEstilo.loginButton}
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
      </Button>
      {emailSent && (
        <Text style={RecuperarContrasenaEstilo.successText}>
          Se ha enviado un correo electrónico de restablecimiento de contraseña.
          Por favor, revisa tu bandeja de entrada.
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword;
