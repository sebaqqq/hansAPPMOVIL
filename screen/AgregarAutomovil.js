import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Picker } from '@react-native-picker/picker'; 
import ValidadorPatenteAutomovil from "./ValidadorPatente";

function AgregarAutomovil({ route }) {
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
    if (patente) {
      const validador = new ValidadorPatenteAutomovil(patente);
      if (!validador.validar()) {
        Alert.alert("Patente invalida");
        return;
      } else {
        Alert.alert("Patente valida");
      }
    }
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
        <Picker
          selectedValue={marca}
          onValueChange={(itemValue) => setMarca(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una marca" value="" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Honda" value="Honda" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Volkswagen" value="Volkswagen" />
          <Picker.Item label="Nissan" value="Nissan" />
          <Picker.Item label="Hyundai" value="Hyundai" />
          <Picker.Item label="Suzuki" value="Suzuki" />
          <Picker.Item label="Kia" value="Kia" />
          <Picker.Item label="Mazda" value="Mazda" />
          <Picker.Item label="Mitsubishi" value="Mitsubishi" />
          <Picker.Item label="Subaru" value="Subaru" />
          <Picker.Item label="Citroën" value="Citroën" />
          <Picker.Item label="Peugeot" value="Peugeot" />
          <Picker.Item label="Audi" value="Audi" />
          <Picker.Item label="BMW" value="BMW" />
          <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
          <Picker.Item label="Fiat" value="Fiat" />
          <Picker.Item label="Chery" value="Chery" />
          <Picker.Item label="Dodge" value="Dodge" />
          <Picker.Item label="Geely" value="Geely" />
          <Picker.Item label="JAC" value="JAC" />
          <Picker.Item label="Jeep" value="Jeep" />
          <Picker.Item label="MG" value="MG" />
          <Picker.Item label="Mini" value="Mini" />
          <Picker.Item label="Ram" value="Ram" />
          <Picker.Item label="SsangYong" value="SsangYong" />
          <Picker.Item label="BYD" value="BYD" />
          <Picker.Item label="Changan" value="Changan" />
          <Picker.Item label="Chrysler" value="Chrysler" />
          <Picker.Item label="Dongfeng" value="Dongfeng" />
          <Picker.Item label="Foton" value="Foton" />
          <Picker.Item label="GAC" value="GAC" />
          <Picker.Item label="Great Wall" value="Great Wall" />
          <Picker.Item label="Haval" value="Haval" />
          <Picker.Item label="JMC" value="JMC" />
          <Picker.Item label="Lifan" value="Lifan" />
          <Picker.Item label="Mahindra" value="Mahindra" />
          <Picker.Item label="Opel" value="Opel" />
          <Picker.Item label="Renault" value="Renault" />
          <Picker.Item label="Skoda" value="Skoda" />
          <Picker.Item label="Tata" value="Tata" />
          <Picker.Item label="Volvo" value="Volvo" />
          <Picker.Item label="Alfa Romeo" value="Alfa Romeo" />
          <Picker.Item label="Aston Martin" value="Aston Martin" />
          <Picker.Item label="BAIC" value="BAIC" />
          <Picker.Item label="Brilliance" value="Brilliance" />
        </Picker>
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
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 8,
    margin: 8,
    width: 200,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
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
  pickerContainer: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    width: '80%',
    overflow: 'hidden',
    marginBottom: 12,
  },
  picker: {
    height: 40,
    width: '80%',
    color: '#333',
    textAlign: 'center', 
  },
});

export default AgregarAutomovil;