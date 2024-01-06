import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Octicons } from "@expo/vector-icons";

const Tareas = () => {
  const [tareasTomadas, setTareasTomadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    cargarTareasTomadas();
  }, []);

  const cargarTareasTomadas = async () => {
    try {
      const identifyUser = auth.currentUser;

      if (identifyUser) {
        const q = query(
          collection(db, "mantenciones"),
          where("personaTomadora", "==", identifyUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const tareasTomadasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTareasTomadas(tareasTomadasData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al cargar tareas tomadas:", error);
    }
  };

  const finalizarTarea = async (taskId) => {
    try {
      // Update the task state to "terminado" in Firestore
      const taskRef = doc(db, "mantenciones", taskId);
      await updateDoc(taskRef, { estado: "terminado", personaTomadora: null });

      // Remove the completed task from the local state
      setTareasTomadas((prevTareas) =>
        prevTareas.filter((tarea) => tarea.id !== taskId && tarea.estado !== "terminado")
      );
    } catch (error) {
      console.error("Error al finalizar la tarea:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await cargarTareasTomadas();
    } catch (error) {
      console.error("Error al refrescar tareas:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando tareas tomadas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas Tomadas</Text>
      {tareasTomadas.length === 0 ? (
        <Text>No has tomado ninguna tarea.</Text>
      ) : (
        <FlatList
          data={tareasTomadas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tareaTomadaItem}>
              <View style={styles.tareaTomadaTextContainer}>
                <Text style={styles.tareaTomadaText}>Patente: {item.id}</Text>
                <Text style={styles.tareaTomadaText}>Estado: {item.estado}</Text>
                <Text style={styles.tareaTomadaText}>Mantención: {item.tipoMantencion}</Text>
              </View>
              <TouchableOpacity onPress={() => finalizarTarea(item.id)}>
                <Octicons name="tasklist" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#0077B6"]}
            />
          }
        />
      )}
    </View>
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
  tareaTomadaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#0077B6",
    borderRadius: 8,
  },
  tareaTomadaTextContainer: {
    flex: 1,
  },
  tareaTomadaText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
});

export default Tareas;
