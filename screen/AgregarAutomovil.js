import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Hola

function AgregarAutomovil() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [color, setColor] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [patente, setPatente] = useState("");

  const agregarAutomovil = async () => {
    try {
      const automovilRef = doc(db, "automoviles", patente);
      const automovilDoc = await getDoc(automovilRef);
      if (automovilDoc.exists()) {
        await setDoc(automovilRef, {
          marca,
          modelo,
          ano,
          color,
          kilometraje,
          timestamp: serverTimestamp(),
        });
        console.log("Automovil updated with Patente (ID): ", patente);
      } else {
        await setDoc(automovilRef, {
          marca,
          modelo,
          ano,
          color,
          kilometraje,
          timestamp: serverTimestamp(),
        });
        console.log("New automovil added with Patente (ID): ", patente);
      }

      setMarca("");
      setModelo("");
      setAno("");
      setColor("");
      setKilometraje("");
      setPatente("");
    } catch (error) {
      console.error("Error adding/updating automovil: ", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar Automovil</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={(text) => setMarca(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={(text) => setModelo(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={ano}
        keyboardType="numeric"
        onChangeText={(text) => setAno(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={(text) => setColor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Patente"
        value={patente}
        onChangeText={(text) => setPatente(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kilometraje"
        value={kilometraje}
        onChangeText={(text) => setKilometraje(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={agregarAutomovil}>
        <Text>Agregar Automovil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 16,
  },
});

export default AgregarAutomovil;