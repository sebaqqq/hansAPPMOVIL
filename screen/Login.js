import React, { useState } from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import "react-native-gesture-handler";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Election');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.logo}>Hans Motors</Text>
          <Text style={styles.heading}>Iniciar Sesión</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon name="envelope" size={20} color="#A0A0A0" style={styles.icon} />
              <View style={styles.labelWrapper}>
                <Text style={email.length > 0 ? styles.labelFocused : styles.label}>
                  Correo electrónico
                </Text>
              </View>
              <TextInput
                placeholder=""
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#A0A0A0" style={styles.icon} />
              <View style={styles.labelWrapper}>
                <Text style={password.length > 0 ? styles.labelFocused : styles.label}>
                  Contraseña
                </Text>
              </View>
              <TextInput
                placeholder=""
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

  logo: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#525FE1",
  },

  heading: {
    fontSize: 24,
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
    marginBottom: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#525FE1",
    paddingVertical: 8,
    paddingLeft: 40,
    color: "#333",
  },

  labelWrapper: {
    position: "absolute",
    top: 8,
    left: 40,
    zIndex: 1,
  },

  label: {
    color: "#A0A0A0",
  },

  labelFocused: {
    color: "#525FE1",
  },

  loginButton: {
    backgroundColor: "#525FE1",
    borderRadius: 20,
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },

  loginButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  icon: {
    position: "absolute",
    left: 8,
    top: 12,
    zIndex: 1,

  },

  // logoImage: {
  //   width: 100, // Adjust the width as needed
  //   height: 100, // Adjust the height as needed
  //   marginBottom: 20,
  // },
});



export default Login;
