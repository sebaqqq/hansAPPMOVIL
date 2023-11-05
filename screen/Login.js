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
  // Estados para almacenar el correo y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hook de navegación para redirigir al usuario después de iniciar sesión
  const navigation = useNavigation();

  React.useEffect(() => {
    // Verificar si el usuario ya ha iniciado sesión
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Election');
      }
    });
    return unsubscribe; // Limpiar el efecto al desmontar el componente
  }, []);

  // Función para manejar el inicio de sesión
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
    // Envuelve la vista con KeyboardAvoidingView para gestionar el teclado
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* ScrollView para permitir desplazamiento si el contenido es demasiado grande */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Contenedor principal */}
        <View style={styles.container}>
          {/* Imagen del logo */}
          <Image source={require('../images/car.png')} style={styles.logoImage} />
          
          {/* Texto del logo */}
          <Text style={styles.logo}>Hans Motors</Text>
          
          {/* Encabezado */}
          <Text style={styles.heading}>Iniciar Sesión</Text>
          
          {/* Contenedor de campos de entrada */}
          <View style={styles.inputContainer}>
            
            {/* Campo de entrada para el correo electrónico */}
            <View style={styles.inputWrapper}>
              <Icon name="envelope" size={20} color="#A0A0A0" style={styles.icon} />
              <View style={styles.labelWrapper}>
                {/* Etiqueta del campo de entrada */}
                <Text style={email ? styles.labelFocused : styles.label}>
                  Correo electrónico
                </Text>
              </View>
              {/* Entrada de texto para el correo electrónico */}
              <TextInput
                placeholder=""
                style={styles.input}
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            {/* Campo de entrada para la contraseña */}
            <View style={styles.inputWrapper}>
              <Icon name="lock" size={20} color="#A0A0A0" style={styles.icon} />
              <View style={styles.labelWrapper}>
                {/* Etiqueta del campo de entrada */}
                <Text style={password ? styles.labelFocused : styles.label}>
                  Contraseña
                </Text>
              </View>
              {/* Entrada de texto para la contraseña */}
              <TextInput
                placeholder=""
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          
          {/* Botón de inicio de sesión */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            {/* Texto dentro del botón de inicio de sesión */}
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  // Contenedor principal de la pantalla
  container: {
    flex: 1,  // Ocupa todo el espacio disponible
    backgroundColor: "#fff",  // Fondo blanco
    alignItems: "center",  // Centra los elementos horizontalmente
    justifyContent: "center",  // Centra los elementos verticalmente
    // paddingHorizontal: 20,  // Relleno horizontal de 20 unidades
  },

  // Estilo para la imagen del logo
  logoImage: {
    marginRight: '2%',
    width: 446,  // Ancho fijo de la imagen
    height: 60,  // Altura fija de la imagen
  },

  // Estilo para el texto del logo
  logo: {
    fontSize: 50,  // Tamaño de fuente
    fontWeight: "bold",  // Fuente en negrita
    marginBottom: 20,  // Margen inferior de 20 unidades
    color: "#525FE1",  // Color del texto
  },

  // Estilo para el encabezado
  heading: {
    fontSize: 30,  // Tamaño de fuente
    fontWeight: "bold",  // Fuente en negrita
    marginBottom: 20,  // Margen inferior de 20 unidades
    marginLeft: '0%',  // Margen derecho del 40%
    color: "#333",  // Color del texto
  },

  // Contenedor de los campos de entrada
  inputContainer: {
    width: "100%",  // Ancho del 100% del contenedor padre
    marginBottom: 10,  // Margen inferior de 10 unidades
  },

  // Estilo para cada campo de entrada
  inputWrapper: {
    position: "relative",  // Posicionamiento relativo
    marginBottom: 20,  // Margen inferior de 20 unidades
  },

  // Estilo para la etiqueta que indica el propósito del campo de entrada
  label: {
    position: "absolute",  // Posicionamiento absoluto
    left: 40,  // Distancia izquierda de 40 unidades
    top: 15,  // Distancia superior de 15 unidades
    color: "#A0A0A0",  // Color del texto
  },

  // Estilo para la etiqueta cuando el campo de entrada está enfocado o tiene texto
  labelFocused: {
    position: "absolute",  // Posicionamiento absoluto
    left: 40,  // Distancia izquierda de 40 unidades
    top: 0,  // Distancia superior de 0 unidades (superpuesto al campo)
    color: "#525FE1",  // Color del texto
  },

  // Estilo para el campo de entrada
  input: {
    borderBottomWidth: 1,  // Borde inferior de 1 unidad
    borderBottomColor: "#525FE1",  // Color del borde inferior
    paddingVertical: 10,  // Relleno vertical de 10 unidades
    paddingLeft: 40,  // Relleno izquierdo de 40 unidades
    marginBottom: 20,  // Margen inferior de 20 unidades
    color: "#333",  // Color del texto
  },

  // Estilo para el botón de inicio de sesión
  loginButton: {
    backgroundColor: "#525FE1",  // Fondo azul
    borderRadius: 30,  // Bordes redondeados de 30 unidades
    paddingVertical: 15,  // Relleno vertical de 15 unidades
    width: "100%",  // Ancho del 100% del contenedor padre
    alignItems: "center",  // Centra los elementos horizontalmente
  },

  // Estilo para el texto dentro del botón de inicio de sesión
  loginButtonText: {
    color: "white",  // Color del texto
    fontSize: 16,  // Tamaño de fuente
    fontWeight: "bold",  // Fuente en negrita
  },

  // Estilo para el icono dentro de los campos de entrada
  icon: {
    position: "absolute",  // Posicionamiento absoluto
    left: 15,  // Distancia izquierda de 15 unidades
    top: 15,  // Distancia superior de 15 unidades
  },

  // Estilo para el contenedor de la etiqueta
  labelWrapper: {
    position: "absolute",  // Posicionamiento absoluto
    left: 40,  // Distancia izquierda de 40 unidades
    top: 0,  // Distancia superior de 0 unidades (superpuesto al campo)
  },
});


export default Login;
