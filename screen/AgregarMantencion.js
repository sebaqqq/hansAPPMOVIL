import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet,
  TouchableOpacity, 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new location

function AgrergarMantencion() {
  const [patente, setPatente] = useState('');
  const [tipoMantencion, setTipoMantencion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome5
          name="car-alt"
          size={24}
          right={20}
          color="#5b6f7f"
          onPress={() => navigation.navigate("Agregar Automovil")}
        />
      ),
    });
  }, [navigation]);

  const handleCheckPatente = async (text) => {
    setPatente(text);
    const carDocRef = doc(db, "automoviles", text);
    const carDocSnapshot = await getDoc(carDocRef);
    if (!carDocSnapshot.exists) {
      setErrorMessage('La patente no existe en la base de datos');
      navigation.navigate("Agregar Automovil");
    } else {
      setErrorMessage('La patente existe en la base de datos');
    }
  };

  const handleSaveMantencion = () => {
    // La lógica para guardar la mantención puede ir aquí
    console.log('Guardar Mantención');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="car" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Patente del auto"
          value={patente}
          onChangeText={(text) => handleCheckPatente(text)}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.inputContainer}>
        <Icon name="wrench" size={20} color="black" style={styles.icon} />
        <Picker
          selectedValue={tipoMantencion}
          onValueChange={(itemValue) => setTipoMantencion(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Cambio de Aceite y Filtro" value="cambio_aceite_filtro" />
          <Picker.Item label="Inspección de Frenos" value="inspeccion_frenos" />
          <Picker.Item label="Revisión de Neumáticos" value="revision_neumaticos" />
          <Picker.Item label='Sistema de Escape' value="sistema_escape" />
          <Picker.Item label='Filtros de Aire y de Habitaculo' value="filtros_aire_habitaculo" />
          <Picker.Item label='Sistema de dirrecion y Suspensión' value="sistema_direccion_suspension" />
          <Picker.Item label='Fluidos' value="fluidos" />
          <Picker.Item label='Bateria' value="bateria" />
          <Picker.Item label='Luces' value="luces" />
          <Picker.Item label='Sistema de Transmisión' value="sistema_transmision" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="comment" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Descripción de la mantención"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveMantencion}>
        <Text style={styles.botonTexto}>Guardar Mantención</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    height: 40,
    width: '80%',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
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
    width: '100%',
    color: '#333',
    textAlign: 'center', 
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5b6f7f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgrergarMantencion;