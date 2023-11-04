import React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";

function Login () {
  return (
    <View style={styles.padre}>
      <Text>Hans Motors</Text>
      <View style={styles.tarjeta}>
        <Text>Iniciar Sesión</Text>
        <TextInput 
          placeholder="Correo electronico" 
          style={styles.cajaTexto}
        />
        <TextInput
          placeholder="Contraseña" 
          style={styles.cajaTexto}
          secureTextEntry={true}
        />
        <View style={styles.padreBoton}>
          <TouchableOpacity style={styles.boton}>
            <Text style={styles.botonTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: "center",
  },
  tarjeta: {
    margin: 20,
    backgroundColor : "#fff",
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  cajaTexto: {
    paddingVertical:20,
    backgroundColor: "#cccccc40",
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal:15,
  },
  padreBoton: {
    alignItems: 'center'
  },
  boton: {
    backgroundColor: "#525FE1",
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20
  },
  botonTexto: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Login;