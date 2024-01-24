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
  Keyboard
} from "react-native";
import { db } from "../firebase";
import { 
  collection, 
  getDocs, 
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const HistorialPatente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patentes, setPatentes] = useState([]);
  const [filtroPatente, setFiltroPatente] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPatente, setSelectedPatente] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigation = useNavigation();

  const recargarDatos = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const patentesSnapshot = await getDocs(collection(db, "mantenciones"));
      const nuevasPatentes = patentesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const patentesFiltradas = nuevasPatentes.filter(
        (patente) => patente.estado !== "en proceso"
      );
  
      const patentesOrdenadas = patentesFiltradas.sort((a, b) => {
        if (a.estado === "pendiente" && b.estado !== "pendiente") {
          return -1; // Colocar "pendiente" antes que otras
        } else if (a.estado !== "pendiente" && b.estado === "pendiente") {
          return 1; 
        } else {
          return 0; 
        }
      });
  
      setPatentes(patentesOrdenadas);
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
                <Text style={styles.patenteText}>{item.id}</Text>
              </TouchableOpacity>
            ))}
            {selectedPatente && (
              <TouchableWithoutFeedback onPress={hideTarjeta}>
                <View style={[styles.overlay, styles.tarjeta]}>
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
    right: 12
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
  tomarTarea: {
    backgroundColor: "#4CAF50", // Color de fondo del botón
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  
  textTomarTarea: {
    color: "#fff", // Color del texto del botón
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HistorialPatente;
