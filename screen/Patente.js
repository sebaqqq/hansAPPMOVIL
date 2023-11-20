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
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { 
  Foundation,
} from '@expo/vector-icons';

const Patente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patentes, setPatentes] = useState([]);
  const [selectedPatente, setSelectedPatente] = useState(null);
  const [filtroPatente, setFiltroPatente] = useState("");

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
    const intervalId = setInterval(() => {
      recargarDatos();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleContainerPress = () => {
    setSelectedPatente(null);
  };

  const renderItem = ({ item }) => {
    if (filtroPatente && !item.id.includes(filtroPatente)) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.patenteItem}
        onPress={() => setSelectedPatente(item)}
      >
        <Text style={styles.patenteText}>Patente: {item.id}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}><Foundation name="clock" size={24} left={12} color="#FFFFFF" />{item.estado}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0077B6" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleContainerPress}
    >
      <Text style={styles.title}>Patentes</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese una patente para filtrar"
        value={filtroPatente}
        onChangeText={(text) => setFiltroPatente(text)}
      />
      <FlatList
        data={patentes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {selectedPatente && (
        <View style={styles.tarjeta}>
          <Text style={styles.status}>{selectedPatente.estado}</Text>
          <Text style={styles.info}>Mantención: {selectedPatente.tipoMantencion}</Text>
          <Text style={styles.info}>Fecha: {selectedPatente.fecha}</Text>
          <Text style={styles.info}>Descripción: {selectedPatente.descripcion}</Text>
        </View>
      )}
    </TouchableOpacity>
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
  patenteItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
    position: 'relative',
  },
  patenteText: {
    fontSize: 26,
    color: "#fff",
  },
  tarjeta: {
    margin: 20,
    marginBottom: '80%',
    backgroundColor: "#fff",
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1,
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  status: {
    fontSize: 14,
    padding: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
    color: "#fff",
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
  },
});

export default Patente;