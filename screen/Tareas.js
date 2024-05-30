import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
} from "react-native";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TareasStyles } from "../styles/TareasEstilo";

const Tareas = () => {
  const [tareasTomadas, setTareasTomadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    cargarTareasTomadas();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name="update"
          size={26}
          color="#0077B6"
          onPress={handleRefresh}
          style={{ marginRight: 20 }}
        />
      ),
    });
  }, [navigation]);

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

  const finalizarTarea = (taskId) => {
    setSelectedTaskId(taskId);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    try {
      const taskRef = doc(db, "mantenciones", selectedTaskId);
      const taskSnapshot = await getDoc(taskRef);
      const taskData = taskSnapshot.data();

      await updateDoc(taskRef, { estado: "terminado", personaTomadora: null });

      await setDoc(doc(db, "historialMantencion", taskData.patente), {
        ...taskData,
        fechaTerminado: new Date().toISOString(),
      });

      setTareasTomadas((prevTareas) =>
        prevTareas.filter(
          (tarea) => tarea.id !== selectedTaskId && tarea.estado !== "terminado"
        )
      );

      Alert.alert("Tarea Terminada con Éxito");
    } catch (error) {
      console.error("Error al finalizar la tarea:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
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
      <View style={TareasStyles.loadingContainer}>
        <Text style={TareasStyles.loadingText}>Cargando tareas tomadas...</Text>
      </View>
    );
  }

  const translateEstado = (estado) => {
    switch (estado) {
      case "atencion_especial":
        return "Atención Especial";
      case "pendiente":
        return "Pendiente";
      case "prioridad":
        return "Prioridad";
      case "en proceso":
        return "En Proceso";
      case "terminado":
        return "Terminado";
      default:
        return estado;
    }
  };

  return (
    <View style={TareasStyles.container}>
      <Text style={TareasStyles.title}>Tareas Tomadas</Text>
      {tareasTomadas.length === 0 ? (
        <Text>No has tomado ninguna tarea.</Text>
      ) : (
        <FlatList
          data={tareasTomadas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={TareasStyles.tareaTomadaItem}>
              <View style={TareasStyles.tareaTomadaTextContainer}>
                <Text style={TareasStyles.tareaTomadaText}>
                  Patente: {item.id}
                </Text>
                <Text style={TareasStyles.tareaTomadaText}>
                  Estado: {translateEstado(item.estado)}
                </Text>
                <Text style={TareasStyles.tareaTomadaText}>
                  Mantención: {item.tipoMantencion}
                </Text>
                <Text style={TareasStyles.tareaTomadaText}>
                  Descripción: {item.descripcion}
                </Text>
                <Text style={TareasStyles.tareaTomadaText}>Producto:</Text>
                {item.productos && (
                  <View style={TareasStyles.productContainer}>
                    {item.productos.map((producto, index) => (
                      <Text style={TareasStyles.tareaTomadaText} key={index}>
                        {" "}
                        - {producto.nombreProducto}
                      </Text>
                    ))}
                  </View>
                )}
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
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={TareasStyles.modalContainer}>
          <View style={TareasStyles.confirmationModal}>
            <Text style={TareasStyles.confirmationModalText}>
              ¿Estás seguro de finalizar la tarea?
            </Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={TareasStyles.confirmationModalButton}>
                Confirmar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={TareasStyles.confirmationModalButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Tareas;
