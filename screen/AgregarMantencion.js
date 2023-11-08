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
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { 
  doc, 
  getDoc, 
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Picker } from '@react-native-picker/picker'; 

function AgrergarMantencion() {
  const [patente, setPatente] = useState('');
  const [tipoMantencion, setTipoMantencion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="car-arrow-right"
          size={24}
          right={20}
          color="#0077B6"
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

  const handleSaveMantencion = async () => {
    try {
      if (!patente || !tipoMantencion || !descripcion) {
        setErrorMessage('Por favor, complete todos los campos.');
        return;
      }

      const mantencionData = {
        tipoMantencion: tipoMantencion,
        descripcion: descripcion,
        fecha: new Date().toISOString(), 
      };
  
      const mantencionDocRef = doc(db, 'mantenciones', patente);
  
      await setDoc(mantencionDocRef, mantencionData);

      setPatente('');
      setTipoMantencion('');
      setDescripcion('');
      setErrorMessage('');
  
      console.log('Maintenance saved successfully!');
    } catch (error) {
      console.error('Error saving maintenance:', error.message);
      setErrorMessage('Error al guardar la mantención. Inténtelo de nuevo.');
    }
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
          <Picker.Item label="Seleccione el tipo de mantención" value="" />
          <Picker.Item label="Sistema de Suspensión" value="sistema_de_suspencion" />
          <Picker.Item label="Afinación del Motor" value="afinacion_de_motor" />
          <Picker.Item label="Sistema de Inyección Electrónica" value="sistema_de_inyeccion_electronica" />
          <Picker.Item label='Sistema de Escape' value="sistema_escape" />
          <Picker.Item label='Sistema de Climatización' value="sistema_de_climatizacion" />
          <Picker.Item label='Sistema de Dirección' value="sistema_de_direccion" />
          <Picker.Item label='Sistema de Frenos' value="sistema_de_motor" />
          <Picker.Item label='Sistema de Encendido' value="sistema_de_encendido" />
          <Picker.Item label='Inspección de Carrocería y Pintura' value="inspección_de_carrocería_y_pintura" />
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
    width: '80%',
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