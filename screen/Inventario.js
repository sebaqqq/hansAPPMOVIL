import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput } from 'react-native';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Inventario = () => {
  const [loading, setLoading] = useState(true);
  const [inventario, setInventario] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const obtenerInventario = async () => {
      try {
        const inventarioSnapshot = await getDocs(collection(db, "inventario"));
        const nuevoInventario = inventarioSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInventario(nuevoInventario);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener inventario:", error);
        Alert.alert("Error", "Hubo un error al obtener el inventario.");
        setLoading(false);
      }
    };

    obtenerInventario();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.inventarioItem}>
      <Text style={styles.itemText}>Nombre Producto: {item.nombreProducto}</Text>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
      <Text style={styles.itemText}>Precio: {item.costo}</Text>
      <Text style={styles.itemText}>Marca: {item.marca}</Text>
      <Text style={styles.itemText}>Categoria: {item.categoria}</Text>
    </View>
  );

  const filteredInventario = inventario.filter(item =>
    item.nombreProducto.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>
      <TextInput
        style={styles.filterInput}
        placeholder="Buscar Producto"
        value={filter}
        onChangeText={(text) => setFilter(text)}
      />
      <FlatList
        data={filteredInventario}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    fontSize: 16,
    color: "#333333",
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Inventario;