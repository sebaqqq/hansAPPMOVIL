// Componente Patente:
// Este componente React Native muestra una lista de patentes y sus estados asociados. Permite filtrar las patentes por su número y ver detalles de mantenimiento al hacer clic en una patente.
// Características Principales:
// - Utiliza el estado para gestionar la carga, los errores, las patentes y la patente seleccionada.
// - Utiliza Firebase Firestore para obtener datos de patentes.
// - Actualiza automáticamente los datos cada 10 segundos utilizando un intervalo.
// - Permite filtrar las patentes por su número mediante un campo de entrada.
// - Muestra una lista de patentes con su número y estado.
// - Muestra detalles de mantenimiento cuando se selecciona una patente.
// - Utiliza estilos y colores para mejorar la presentación visual.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Foundation } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const Patente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patentes, setPatentes] = useState([]);
  const [filtroPatente, setFiltroPatente] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPatente, setSelectedPatente] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const recargarDatos = async () => {
    setLoading(true);
    setError(null);

    try {
      const patentesSnapshot = await getDocs(collection(db, "mantenciones"));
      const nuevasPatentes = patentesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPatentes(nuevasPatentes);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener patentes:", error);
      setError(error);
      setLoading(false);
      Alert.alert("Error", "Hubo un error al obtener las patentes.");
    }
  };

  useEffect(() => {
    recargarDatos();
  }, []);

  const handleContainerPress = () => {
    setSelectedPatente(null);
  };

  const selectPatente = (patente) => {
    setSelectedPatente(selectedPatente === patente ? null : patente);
  };

  const renderItem = ({ item }) => {
    if (filtroPatente && !item.id.includes(filtroPatente)) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.patenteItem}
        onPress={() => selectPatente(item)}
      >
        <Text style={styles.patenteText}>Patente: {item.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>
            <Foundation name="clock" size={24} left={12} color="#FFFFFF" />
            {item.estado}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredPatentes = patentes.filter(
    (item) =>
      item.id.toLowerCase().includes(filtroPatente.toLowerCase()) &&
      (!selectedCategory || item.estado.toLowerCase() === selectedCategory.toLowerCase())
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await recargarDatos();
    setRefreshing(false);
  };

  const hideTarjeta = () => {
    setSelectedPatente(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Patentes</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.filterInput}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Prioridad" value="prioridad" />
          <Picker.Item label="Atención Especial" value="atencion especial" />
          <Picker.Item label="En proceso" value="en proceso" />
          <Picker.Item label="Entregados" value="entregados" />
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText={setFiltroPatente}
          value={filtroPatente}
          placeholder="Filtrar por patente"
          autoCapitalize="characters" // Convertir automáticamente a mayúsculas
          keyboardType="ascii-capable"
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.content}>
            {filteredPatentes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.patenteItem}
                onPress={() => selectPatente(item)}
              >
                <Text style={styles.patenteText}>Patente: {item.id}</Text>
                <View style={styles.statusContainer}>
                  <Text style={styles.status}>
                    <Foundation
                      name="clock"
                      size={24}
                      left={12}
                      color="#FFFFFF"
                    />
                    {item.estado}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            {selectedPatente && (
              <TouchableWithoutFeedback onPress={hideTarjeta}>
                <View style={[styles.overlay, styles.tarjeta]}>
                  <Text style={styles.status}>{selectedPatente.estado}</Text>
                  <Text style={styles.info}>
                    Mantención: {selectedPatente.tipoMantencion}
                  </Text>
                  <Text style={styles.info}>Fecha: {selectedPatente.fecha}</Text>
                  <Text style={styles.info}>
                    Descripción: {selectedPatente.descripcion}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  content: {
    marginTop: 8,
  },
  patenteItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
  },
  patenteText: {
    fontSize: 26,
    color: "#fff",
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  status: {
    fontSize: 14,
    padding: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
    color: "#fff",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1,
  },
  tarjeta: {
    padding: 20,
    zIndex: 2,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
  scrollContent: {
    paddingBottom: 100, // Ajusta este valor según sea necesario
  },
});

export default Patente;
