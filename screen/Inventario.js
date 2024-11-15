import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  RefreshControl,
} from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { InventarioStyles } from "../styles/InventarioEstilo";
import { Searchbar, Card } from "react-native-paper";

const Inventario = () => {
  const [loading, setLoading] = useState(false);
  const [inventario, setInventario] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const obtenerInventario = async () => {
    setLoading(true);
    try {
      const inventarioSnapshot = await getDocs(collection(db, "inventario"));
      const nuevoInventario = inventarioSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventario(nuevoInventario);
    } catch (error) {
      console.error("Error al obtener inventario:", error);
      Alert.alert("Error", "Hubo un error al obtener el inventario.");
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
      cantidadStyle = InventarioStyles.cantidadBaja;
    } else if (item.cantidad >= 10 && item.cantidad <= 20) {
      cantidadStyle = InventarioStyles.cantidadMedia;
    } else {
      cantidadStyle = InventarioStyles.cantidadNormal;
    }

    return (
      <Card style={InventarioStyles.inventarioItem}>
        <Card.Content>
          <Text style={InventarioStyles.itemText}>ID: {item.id}</Text>
          <Text style={InventarioStyles.itemText}>Marca: {item.marca}</Text>
          <Text style={InventarioStyles.itemText}>
            Nombre Producto: {item.nombreProducto}
          </Text>
          <Text style={InventarioStyles.itemText}>
            Categoría: {item.categoria}
          </Text>
          <Text style={[InventarioStyles.itemText, cantidadStyle]}>
            Cantidad: {item.cantidad}
          </Text>
          <Text style={InventarioStyles.itemText}>Precio: {item.costo}</Text>
        </Card.Content>
      </Card>
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
    <View style={InventarioStyles.container}>
      <Searchbar
        placeholder="Buscar Producto"
        placeholderTextColor={"white"}
        inputStyle={{ color: "white" }}
        iconColor="white"
        onChangeText={(text) => setFilter(text)}
        value={filter}
        style={InventarioStyles.searchBar}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={InventarioStyles.filterInput}
      >
        <Picker.Item label="Todas las Categorías" value="" />
        <Picker.Item
          label="Sistema de Suspensión"
          value="Sistema de Suspensión"
        />
        <Picker.Item label="Afinación del Motor" value="Afinación del Motor" />
        <Picker.Item
          label="Sistema de Inyección Electrónica"
          value="Sistema de Inyección Electrónica"
        />
        <Picker.Item label="Sistema de Escape" value="Sistema de Escape" />
        <Picker.Item
          label="Sistema de Climatización"
          value="Sistema de Climatización"
        />
        <Picker.Item
          label="Sistema de Lubricación"
          value="Sistema de Lubricación"
        />
        <Picker.Item
          label="Sistema de Dirección"
          value="Sistema de Dirección"
        />
        <Picker.Item label="Sistema de Frenos" value="Sistema de Frenos" />
        <Picker.Item
          label="Sistema de Encendido"
          value="Sistema de Encendido"
        />
        <Picker.Item
          label="Inspección de Carrocería y Pintura"
          value="Inspección de Carrocería y Pintura"
        />
        <Picker.Item
          label="Sistema de Transmisión"
          value="Sistema de Transmisión"
        />
        <Picker.Item
          label="Herramientas y Equipos"
          value="Herramientas y Equipos"
        />
        <Picker.Item
          label="Sistema de Refrigeración"
          value="Sistema de Refrigeración"
        />
        <Picker.Item
          label="Accesorios y Personalización"
          value="Accesorios y Personalización"
        />
      </Picker>

      <FlatList
        data={filteredInventario}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Inventario;
