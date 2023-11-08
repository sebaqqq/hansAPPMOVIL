import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Patente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patentes, setPatentes] = useState([]);

  useEffect(() => {
    const obtenerPatentes = async () => {
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

    obtenerPatentes();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patenteItem}
      onPress={() => {
        console.log("Clic en patente:", item);
      }}
    >
      <Text>{item.nombrePatente}</Text>
      <Text>Patente: {item.id}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patentes</Text>
      <FlatList
        data={patentes}
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  patenteItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default Patente;