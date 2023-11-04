import React, { useState } from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
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
        navigation.replace('HomeLogin');
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
    <View style={styles.container}>
      <Image source={require('../images/car.png')} style={styles.logoImage} />
      <Text style={styles.logo}>Hans Motors</Text>
      <Text style={styles.heading}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        
        <TouchableOpacity
          style={styles.inputWrapper}
          activeOpacity={1}
        >
          <Icon name="envelope" size={20} color="#A0A0A0" style={styles.icon} />
          <View style={styles.labelWrapper}>
            <Text style={email.focused || email.text ? styles.labelFocused : styles.label}>
              Correo electrónico
            </Text>
          </View>
          <TextInput
            placeholder=""
            style={styles.input}
            placeholderTextColor="#A0A0A0"
            onChangeText={(text) => setEmail(text)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inputWrapper}
          activeOpacity={1}
        >
          <Icon name="lock" size={20} color="#A0A0A0" style={styles.icon} />
          <View style={styles.labelWrapper}>
            <Text style={password.focused || password.text ? styles.labelFocused : styles.label}>
              Contraseña
            </Text>
          </View>
          <TextInput
            placeholder=""
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#A0A0A0"
            onChangeText={(text) => setPassword(text)}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
      >
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
    width: 446,
    height: 60,
  },
  logo: {
    fontSize: 50,  
    fontWeight: "bold",
    marginBottom: 20,
    color: "#525FE1",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginRight: '40%',
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
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
    marginBottom: 20,
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
  icon: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  labelWrapper: {
    marginLeft: 40, // Ajusta la separación según tus necesidades
    position: "absolute",
  },
});

export default Login;