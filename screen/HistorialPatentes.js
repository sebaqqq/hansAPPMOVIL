import React, { useEffect, useState } from "react";
import {
  View,
  Text,
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
import { HistorialPatentesStyles } from "../styles/HistorialPatentesEstilo";

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
        style={HistorialPatentesStyles.patenteItem}
        onPress={() => selectPatente(item)}
      >
        <Text style={HistorialPatentesStyles.patenteText}>Patente: {item.id}</Text>
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
      <View style={HistorialPatentesStyles.container}>
        <TextInput
          style={HistorialPatentesStyles.input}
          onChangeText={setFiltroPatente}
          value={filtroPatente}
          placeholder="Filtrar por patente"
          autoCapitalize="characters" 
          keyboardType="ascii-capable"
        />
        <ScrollView
          contentContainerStyle={HistorialPatentesStyles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={HistorialPatentesStyles.content}>
            {filteredPatentes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={HistorialPatentesStyles.patenteItem}
                onPress={() => selectPatente(item)}
              >
                <Text style={HistorialPatentesStyles.patenteText}>{item.id}</Text>
              </TouchableOpacity>
            ))}
            {selectedPatente && (
              <TouchableWithoutFeedback onPress={hideTarjeta}>
                <View style={[HistorialPatentesStyles.overlay, HistorialPatentesStyles.tarjeta]}>
                  <Text style={HistorialPatentesStyles.info}>
                    Mantención: {selectedPatente.tipoMantencion}
                  </Text>
                  <Text style={HistorialPatentesStyles.info}>Fecha: {selectedPatente.fecha}</Text>
                  <Text style={HistorialPatentesStyles.info}>
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

export default HistorialPatente;
