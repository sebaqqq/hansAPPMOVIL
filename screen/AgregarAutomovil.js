import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

function AgregarAutomovil({route}) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [color, setColor] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [patente, setPatente] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.patente) {
      setPatente(route.params.patente);
    }
  }, [route.params]);
  
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
      navigation.navigate("Agregar Mantencion");
    } catch (error) {
      console.error("Error adding/updating automovil: ", error);
    }
  };
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Agregar Automovil</Text>
        <Text style={styles.nombreCategoria}>Marca</Text>
        <TextInput
          style={styles.input}
          placeholder="Marca"
          value={marca}
          onChangeText={(text) => setMarca(text)}
        />
        <Text style={styles.nombreCategoria}>Modelo</Text>
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={(text) => setModelo(text)}
        />
        <Text style={styles.nombreCategoria}>Año</Text>
        <TextInput
          style={styles.input}
          placeholder="Año"
          value={ano}
          keyboardType="numeric"
          onChangeText={(text) => setAno(text)}
        />
        <Text style={styles.nombreCategoria}>Color</Text>
        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={(text) => setColor(text)}
        />
        <Text style={styles.nombreCategoria}>Patente</Text>
        <TextInput
          style={styles.input}
          placeholder="Patente"
          value={patente}
          onChangeText={(text) => setPatente(text)}
        />
        <Text style={styles.nombreCategoria}>Kilometraje</Text>
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
    </ScrollView>
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
    borderColor: "#bbb",
    borderRadius: 3,
    padding: 8,
    margin: 8,
    width: 200,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
  },
  titulo: {
    fontSize: 28,
    marginBottom: 12,
  },
  nombreCategoria: {
    fontSize: 18,
    marginBottom: 4,
  },
});

export default AgregarAutomovil;