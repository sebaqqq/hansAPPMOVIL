import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Alert, 
  TextInput,
  ActivityIndicator 
} from 'react-native';
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
        <Text style={styles.itemText}>Categoria: {item.categoria}</Text>
        <Text style={[styles.itemText, cantidadStyle]}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.itemText}>Precio: {item.costo}</Text>
      </View>
    );
  };

  const filteredInventario = inventario.filter(item =>
    item.nombreProducto.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
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
    color: '#333333', // o el color predeterminado
  },
});

export default Inventario;