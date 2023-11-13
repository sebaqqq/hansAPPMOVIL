import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet,
  TouchableOpacity, 
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { 
  doc, 
  getDoc, 
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Picker } from '@react-native-picker/picker'; 

function AgrergarMantencion() {
  const [patente, setPatente] = useState('');
  const [tipoMantencion, setTipoMantencion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [kilometrajeMantencion, setKilometrajeMantencion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="car-arrow-right"
          size={26}
          right={20}
          color="#0077B6"
          onPress={() => navigation.navigate('Agregar Automovil')}
        />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    const cargarProductos = async () => {
      try {
        if (!tipoMantencion) {
          setProductos([]);
          return;
        }

        const inventarioRef = collection(db, 'inventario');
        const q = query(inventarioRef, where('categoria', '==', tipoMantencion));

        const snapshot = await getDocs(q);
        const productosData = [];

        snapshot.forEach((doc) => {
          const producto = doc.data();
          productosData.push(producto);
        });

        setProductos(productosData);
      } catch (error) {
        console.error('Error al cargar productos:', error.message);
      }
    };

    cargarProductos();
  }, [tipoMantencion]);

  const handleCheckPatente = async (text) => {
    try {
      // Verify if the text is a non-empty string
      if (typeof text !== 'string' || text.trim() === '') {
        setErrorMessage('La patente no es válida.');
        return;
      }
  
      setPatente(text);
      const carDocM = doc(db, 'automoviles', text);
      const carDocSnapshotM = await getDoc(carDocM);
  
      if (carDocSnapshotM.exists) {
        setErrorMessage('Automóvil encontrado');
      } else {
        setErrorMessage('No se encontró un automóvil con esa patente');
      }
    } catch (error) {
      console.error('Error checking patente:', error.message);
      setErrorMessage('Error al verificar la patente. Inténtelo de nuevo.');
    }
  };

  const handleSaveMantencion = async () => {
    try {
      if (!patente || !tipoMantencion || !descripcion || !estado || !kilometrajeMantencion || !productos) {
        setErrorMessage('Por favor, complete todos los campos.');
        return;
      }
  
      // Verify if the patente is a non-empty string
      if (typeof patente !== 'string' || patente.trim() === '') {
        setErrorMessage('La patente no es válida.');
        return;
      }
  
      const carDocRef = doc(db, 'automoviles', patente);
      const carDocSnapshot = await getDoc(carDocRef);
  
      if (!carDocSnapshot.exists()) {
        navigation.navigate('Agregar Automovil', { patente });
        return;
      }
  
      const mantencionData = {
        tipoMantencion: tipoMantencion,
        descripcion: descripcion,
        fecha: new Date().toISOString(),
        estado: estado,
        kilometrajeMantencion: kilometrajeMantencion,
        productos: productos,
      };
  
      const mantencionDocRef = doc(db, 'mantenciones', patente);
  
      await setDoc(mantencionDocRef, mantencionData);
  
      setPatente('');
      setTipoMantencion('');
      setDescripcion('');
      setEstado('');
      setKilometrajeMantencion('');
      setProductos([]);
      setErrorMessage('');
  
      Alert.alert("Mantención agregada correctamente");
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
          <Picker.Item label="Todas las Categorías" value="" />
          <Picker.Item label="Sistema de Suspensión" value="Sistema de Suspensión" />
          <Picker.Item label="Afinación del Motor" value="Afinación del Motor" />
          <Picker.Item label="Sistema de Inyección Electrónica" value="Sistema de Inyección Electrónica" />
          <Picker.Item label='Sistema de Escape' value="Sistema de Escape" />
          <Picker.Item label='Sistema de Climatización' value="Sistema de Climatización" />
          <Picker.Item label='Sistema de Lubricación' value="Sistema de Lubricación" />
          <Picker.Item label='Sistema de Dirección' value="Sistema de Dirección" />
          <Picker.Item label='Sistema de Frenos' value="Sistema de Frenos" />
          <Picker.Item label='Sistema de Encendido' value="Sistema de Encendido" />
          <Picker.Item label='Inspección de Carrocería y Pintura' value="Inspección de Carrocería y Pintura" />
          <Picker.Item label='Sistema de Transmisión' value="Sistema de Transmisión" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="list" size={20} color="black" style={styles.icon} />
        {productos && productos.length > 0 ? (
          <Picker
            selectedValue={productos.length > 0 ? productos[0]?.nombreProducto : ""}
            onValueChange={(itemValue) => setProductos(itemValue !== "" ? [{ nombreProducto: itemValue }] : [])}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione el producto a utilizar" value="" />
            {productos.map((item) => (
              <Picker.Item
                label={item.nombreProducto}
                value={item.nombreProducto}
                key={item.nombreProducto} // Use the product name as the key
              />
            ))}
          </Picker>
        ) : (
          <Text>No hay productos disponibles.</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Icon name="check" size={20} color="black" style={styles.icon} />
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione el estado de la mantención" value="" />
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Prioridad" value="prioridad" />
          <Picker.Item label="En proceso" value="en proceso" />
          <Picker.Item label="Atencion Especial" value="atencion especial" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="tachometer" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Kilometraje de la mantención"
          keyboardType='numeric'
          value={kilometrajeMantencion}
          onChangeText={(text) => setKilometrajeMantencion(text)}
        />
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
    backgroundColor: '#0077B6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgrergarMantencion;