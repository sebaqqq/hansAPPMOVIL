// Componente Inventario:
// Este componente React Native muestra un inventario de productos con la posibilidad de filtrar y buscar.
// Características Principales:
// - Utiliza el estado para gestionar la carga, el inventario, el filtro de búsqueda y la categoría seleccionada.
// - Utiliza Firebase Firestore para obtener datos del inventario.
// - Muestra un indicador de carga mientras se obtiene el inventario.
// - Utiliza un componente `Picker` para seleccionar una categoría y filtrar el inventario por ella.
// - Utiliza un campo de entrada de texto para filtrar productos por nombre.
// - Muestra la lista de productos con información detallada, incluyendo marca, nombre, categoría, cantidad y precio.
// - Cambia el color del texto de la cantidad dependiendo de su nivel (baja, media, normal).

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  RefreshControl,
} from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const Inventario = () => {
  const [loading, setLoading] = useState(false);
  const [inventario, setInventario] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const obtenerInventario = async () => {
    setLoading(true);
    try {
      const inventarioSnapshot = await getDocs(collection(db, 'inventario'));
      const nuevoInventario = inventarioSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventario(nuevoInventario);
    } catch (error) {
      console.error('Error al obtener inventario:', error);
      Alert.alert('Error', 'Hubo un error al obtener el inventario.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerInventario();
  }, []);

  useEffect(() => {
    obtenerInventario();
  }, [refreshing]);

  const renderItem = ({ item }) => {
    let cantidadStyle;
    if (item.cantidad < 10) {
      cantidadStyle = styles.cantidadBaja;
    } else if (item.cantidad >= 10 && item.cantidad <= 20) {
      cantidadStyle = styles.cantidadMedia;
    } else {
      cantidadStyle = styles.cantidadNormal;
    }

    return (
      <View style={[styles.inventarioItem, cantidadStyle]}>
        <Text style={styles.itemText}>Marca: {item.marca}</Text>
        <Text style={styles.itemText}>Nombre Producto: {item.nombreProducto}</Text>
        <Text style={styles.itemText}>Categoría: {item.categoria}</Text>
        <Text style={[styles.itemText, cantidadStyle]}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.itemText}>Precio: {item.costo}</Text>
      </View>
    );
  };

  const filteredInventario = inventario.filter(
    (item) =>
      item.nombreProducto.toLowerCase().includes(filter.toLowerCase()) &&
      (!selectedCategory || item.categoria === selectedCategory)
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await obtenerInventario();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.filterInput}
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

      <TextInput
        style={styles.filterInput}
        placeholder="Buscar Producto"
        value={filter}
        onChangeText={(text) => setFilter(text)}
      />
      <FlatList
        data={filteredInventario}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Convert id to string
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  inventarioItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 15,
    color: "#333333",
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
  cantidadBaja: {
    color: 'red',
  },
  cantidadMedia:{
    color: 'orange'
  },
  cantidadNormal: {
    color: '#333333',
  },
});

export default Inventario;