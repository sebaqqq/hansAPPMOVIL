import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { doc, getDoc, collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { db } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { AgregarMantencionStyles } from '../styles/AgregarMantencionEstilo';

function AgregarMantencion() {
  const [patente, setPatente] = useState('');
  const [tipoMantencion, setTipoMantencion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [kilometrajeMantencion, setKilometrajeMantencion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [productos, setProductos] = useState([]);
  const [mantencionesPendientes, setMantencionesPendientes] = useState([]);
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
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
      if (typeof text !== 'string' || text.trim() === '') {
        setErrorMessage('La patente no es válida.');
        return;
      }
  
      setPatente(text);
      const carDocM = doc(db, 'automoviles', text);
      const carDocSnapshotM = await getDoc(carDocM);
  
      if (carDocSnapshotM.exists() && carDocSnapshotM.data()) {
        setErrorMessage('Automóvil encontrado');
      } else {
        setErrorMessage('No se encontró un automóvil con esa patente');
      }
    } catch (error) {
      console.error('Error checking patente:', error.message);
      setErrorMessage('Error al verificar la patente. Inténtelo de nuevo.');
    }
  };

  const handleAddMantencion = async () => {
    try {
      if (!patente || !tipoMantencion || !descripcion || !estado || !kilometrajeMantencion || !productoSeleccionado) {
        setErrorMessage('Por favor, complete todos los campos.');
        return;
      }
  
      if (typeof patente !== 'string' || patente.trim() === '') {
        setErrorMessage('La patente no es válida.');
        return;
      }

      await handleCheckPatente(patente); 
  
      const mantencionData = {
        patente: patente, 
        tipoMantencion: tipoMantencion,
        descripcion: descripcion,
        fecha: new Date().toISOString(),
        estado: estado,
        kilometrajeMantencion: kilometrajeMantencion,
        productos: [{ nombreProducto: productoSeleccionado }],
      };
  
      setMantencionesPendientes([...mantencionesPendientes, mantencionData]);
  
      Alert.alert("Mantención agregada a la lista de pendientes");
    } catch (error) {
      console.error('Error saving maintenance:', error.message);
      setErrorMessage('Error al guardar la mantención. Inténtelo de nuevo.');
    }
  };
  
  const handleConfirmationAndSave = async () => {
    hideConfirmationModal();
    try {
      const batch = writeBatch(db);
      let tareaCount = 1;
  
      for (const mantencion of mantencionesPendientes) {
        const tareaId = `Tarea-${tareaCount}`;
        const mantencionDocRef = doc(db, 'mantenciones', `${mantencion.patente}-${tareaId}`);
        batch.set(mantencionDocRef, mantencion);
        tareaCount++;
      }
  
      await batch.commit();
  
      setPatente('');
      setTipoMantencion('');
      setDescripcion('');
      setEstado('');
      setKilometrajeMantencion('');
      setProductoSeleccionado('');
      setErrorMessage('');
  
      setMantencionesPendientes([]);
      Alert.alert("Mantenciones guardadas correctamente");
    } catch (error) {
      console.error('Error saving mantenciones:', error.message);
      setErrorMessage('Error al guardar las mantenciones. Inténtelo de nuevo.');
    }
  };
  
  const showConfirmationModal = () => {
    setConfirmationModalVisible(true);
  };

  const hideConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={AgregarMantencionStyles.container}>
        <Text style={AgregarMantencionStyles.textTitle}>Agregar Mantención</Text>
        <View style={AgregarMantencionStyles.inputContainer}>
          <Icon name="car" size={20} color="black" style={AgregarMantencionStyles.icon} />
          <TextInput
            style={AgregarMantencionStyles.input}
            placeholder="Patente del auto"
            value={patente}
            autoCapitalize="characters"
            keyboardType="ascii-capable"
            onChangeText={(text) => handleCheckPatente(text)}
          />
        </View>
        {errorMessage ? <Text style={AgregarMantencionStyles.errorText}>{errorMessage}</Text> : null}
        <View style={AgregarMantencionStyles.inputContainer}>
          <Icon name="wrench" size={20} color="black" style={AgregarMantencionStyles.icon} />
          <Picker
            selectedValue={tipoMantencion}
            onValueChange={(itemValue) => setTipoMantencion(itemValue)}
            style={AgregarMantencionStyles.picker}
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
        <View style={AgregarMantencionStyles.inputContainer}>
          <Icon name="list" size={20} color="black" style={AgregarMantencionStyles.icon} />
          {productos && productos.length > 0 ? (
            <Picker
              selectedValue={productoSeleccionado}
              onValueChange={(itemValue) => setProductoSeleccionado(itemValue)}
              style={AgregarMantencionStyles.picker}
            >
              <Picker.Item label="Seleccione el producto a utilizar" value="" />
              {productos.map((item) => (
                <Picker.Item
                  label={item.nombreProducto}
                  value={item.nombreProducto}
                  key={item.nombreProducto}
                />
              ))}
            </Picker>
          ) : (
            <Text>No hay productos disponibles.</Text>
          )}
        </View>
        <View style={AgregarMantencionStyles.inputContainer}>
          <Icon name="check" size={20} color="black" style={AgregarMantencionStyles.icon} />
          <Picker
            selectedValue={estado}
            onValueChange={(itemValue) => setEstado(itemValue)}
            style={AgregarMantencionStyles.picker}
          >
            <Picker.Item label="Seleccione el estado de la mantención" value="" />
            <Picker.Item label="Pendiente" value="pendiente" />
            <Picker.Item label="Prioridad" value="prioridad" />
            <Picker.Item label="Atención Especial" value="atencion especial" />
          </Picker>
        </View>
        <View style={AgregarMantencionStyles.inputContainer}>
          <Icon name="tachometer" size={20} color="black" style={AgregarMantencionStyles.icon} />
          <TextInput
            style={AgregarMantencionStyles.input}
            placeholder="Kilometraje de la mantención"
            keyboardType='numeric'
            value={kilometrajeMantencion}
            onChangeText={(text) => setKilometrajeMantencion(text)}
          />
        </View>
        <View style={AgregarMantencionStyles.inputContainer}>
          <Icon name="comment" size={20} color="black" style={AgregarMantencionStyles.icon} />
          <TextInput
            style={AgregarMantencionStyles.input}
            placeholder="Descripción de la mantención"
            value={descripcion}
            onChangeText={(text) => setDescripcion(text)}
          />
        </View>
        <TouchableOpacity style={AgregarMantencionStyles.button} onPress={handleAddMantencion}>
          <Text style={AgregarMantencionStyles.botonTexto}>Agregar Mantención a Lista</Text>
        </TouchableOpacity>
        <FlatList
          data={mantencionesPendientes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={AgregarMantencionStyles.mantencionItem}>
              <Text>Tipo: {item.tipoMantencion}</Text>
              <Text>Descripción: {item.descripcion}</Text>
              <Text>Fecha: {item.fecha}</Text>
              <Text>Estado: {item.estado}</Text>
              <Text>Kilometraje: {item.kilometrajeMantencion}</Text>
              <Text>Productos: {item.productos.map((producto) => producto.nombreProducto).join(", ")}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={AgregarMantencionStyles.button} onPress={showConfirmationModal}>
          <Text style={AgregarMantencionStyles.botonTexto}>Guardar Mantenciones</Text>
        </TouchableOpacity>
        <Modal
          isVisible={isConfirmationModalVisible}
          onBackdropPress={hideConfirmationModal}
        >
          <View style={AgregarMantencionStyles.confirmationModal}>
            <Text style={AgregarMantencionStyles.confirmationModalText}>
              ¿Estás seguro de que deseas guardar estas mantenciones?
            </Text>
            <TouchableOpacity onPress={handleConfirmationAndSave}>
              <Text style={AgregarMantencionStyles.confirmationModalButton}>Sí, Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideConfirmationModal}>
              <Text style={AgregarMantencionStyles.confirmationModalButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export default AgregarMantencion;
