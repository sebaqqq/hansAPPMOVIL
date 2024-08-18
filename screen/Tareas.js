import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, Alert } from "react-native";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TareasStyles } from "../styles/TareasEstilo";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Modal as PaperModal,
} from "react-native-paper";

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
          color="#4a7f8d"
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
      {tareasTomadas.length === 0 ? (
        <Paragraph>No has tomado ninguna tarea.</Paragraph>
      ) : (
        <FlatList
          data={tareasTomadas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={TareasStyles.tareaTomadaItem}>
              <Card.Content>
                <Title>{item.id}</Title>
                <Paragraph>Estado: {translateEstado(item.estado)}</Paragraph>
                <Paragraph>Mantención: {item.tipoMantencion}</Paragraph>
                <Paragraph>Descripción: {item.descripcion}</Paragraph>
                <Paragraph>Producto:</Paragraph>
                {item.productos && (
                  <View style={TareasStyles.productContainer}>
                    {item.productos.map((producto, index) => (
                      <Paragraph key={index}>
                        - {producto.nombreProducto}
                      </Paragraph>
                    ))}
                  </View>
                )}
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => finalizarTarea(item.id)}
                  style={{ backgroundColor: "#4a7f8d" }}
                >
                  Finalizar
                </Button>
              </Card.Actions>
            </Card>
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
      <PaperModal
        visible={modalVisible}
        onDismiss={handleCancel}
        contentContainerStyle={TareasStyles.modalContainer}
      >
        <View style={TareasStyles.modalContent}>
          <Title style={TareasStyles.confirmationModalText}>
            ¿Estás seguro de finalizar la tarea?
          </Title>
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={TareasStyles.confirmationModalButton}
          >
            Confirmar
          </Button>
          <Button
            mode="contained"
            onPress={handleCancel}
            style={TareasStyles.confirmationModalButton}
          >
            Cancelar
          </Button>
        </View>
      </PaperModal>
    </View>
  );
};

export default Tareas;
