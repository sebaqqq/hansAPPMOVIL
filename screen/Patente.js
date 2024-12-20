import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, Alert, RefreshControl } from "react-native";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import PatenteStyles from "../styles/PatenteEstilo";
import {
  Searchbar,
  Modal,
  Portal,
  Button,
  Card,
  PaperProvider,
} from "react-native-paper";
import { color } from "react-native-elements/dist/helpers";
import { colors } from "react-native-elements";

const Patente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patentes, setPatentes] = useState([]);
  const [filtroPatente, setFiltroPatente] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPatente, setSelectedPatente] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userData, setUserData] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <MaterialIcons
            name="inventory"
            size={24}
            color="#4a7f8d"
            onPress={() => navigation.navigate("Inventario")}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const identifyUser = auth.currentUser;
    if (identifyUser) {
      const userRef = doc(db, "users", identifyUser.uid);
      onSnapshot(userRef, (snapshot) => {
        const userData = snapshot.data();
        setUserData(userData);
      });
    }
  }, []);

  const recargarDatos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const patentesSnapshot = await getDocs(collection(db, "mantenciones"));
      const nuevasPatentes = patentesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let patentesFiltradas = nuevasPatentes;
      if (selectedCategory) {
        patentesFiltradas = patentesFiltradas.filter(
          (patente) => patente.estado === selectedCategory
        );
      }

      patentesFiltradas = patentesFiltradas.filter(
        (patente) => patente.estado !== "en proceso"
      );

      if (filtroPatente) {
        patentesFiltradas = patentesFiltradas.filter((patente) =>
          patente.id.toLowerCase().includes(filtroPatente.toLowerCase())
        );
      }

      const patentesOrdenadas = patentesFiltradas.sort((a, b) => {
        if (a.estado === "pendiente" && b.estado !== "pendiente") {
          return -1;
        } else if (a.estado !== "pendiente" && b.estado === "pendiente") {
          return 1;
        } else {
          return 0;
        }
      });

      setPatentes(patentesOrdenadas);
    } catch (error) {
      console.error("Error al obtener patentes:", error);
      setError(error);
      Alert.alert("Error", "Hubo un error al obtener las patentes.");
    } finally {
      setLoading(false);
    }
  }, [filtroPatente, selectedCategory]);

  useEffect(() => {
    recargarDatos();
  }, [recargarDatos]);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await recargarDatos();
    setRefreshing(false);
  };

  const hideTarjeta = () => {
    setSelectedPatente(null);
  };

  const tomarTarea = async () => {
    if (!selectedPatente) {
      return;
    }

    try {
      const identifyUser = auth.currentUser;

      if (identifyUser) {
        const patenteRef = doc(db, "mantenciones", selectedPatente.id);

        const patenteSnapshot = await getDoc(patenteRef);
        const patenteData = patenteSnapshot.data();

        if (patenteData.personaTomadora) {
          Alert.alert(
            "Tarea ya Tomada",
            "Esta tarea ya ha sido tomada por otra persona."
          );
          return;
        }

        if (patenteData.estado === "terminado") {
          Alert.alert(
            "Tarea Terminada",
            "Esta tarea ya ha sido marcada como terminada y no se puede tomar de nuevo."
          );
          return;
        }

        await updateDoc(patenteRef, {
          personaTomadora: identifyUser.uid,
          estado: "en proceso",
        });

        await recargarDatos();

        setConfirmModalVisible(true);

        const timeoutId = setTimeout(() => {
          hideTarjeta();
        }, 24 * 60 * 60 * 1000);

        setHideTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Error al tomar tarea:", error);
      Alert.alert("Error", "Hubo un error al tomar la tarea.");
    }
  };

  const handleCloseModal = () => {
    setConfirmModalVisible(false);
    setModalVisible(false);
  };

  const handleConfirmModal = () => {
    setConfirmModalVisible(false);
    setModalVisible(false);
    setSelectedPatente(null);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  const formatoKilometraje = (amount) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <PaperProvider>
      <View style={PatenteStyles.container}>
        <Searchbar
          placeholder="Buscar patente..."
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          iconColor="white"
          onChangeText={(query) => setFiltroPatente(query)}
          value={filtroPatente}
          style={PatenteStyles.searchBar}
          autoCapitalize="characters"
        />
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={PatenteStyles.filterInput}
        >
          <Picker.Item label="Todos" value="" />
          <Picker.Item label="Pendientes" value="pendiente" />
          <Picker.Item label="Prioridad" value="prioridad" />
          <Picker.Item label="Atención Especial" value="atencion_especial" />
          <Picker.Item label="Terminado" value="terminado" />
        </Picker>

        <ScrollView
          style={PatenteStyles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {patentes.map((patente) => (
            <Card
              key={patente.id}
              style={[
                PatenteStyles.patenteItem,
                selectedPatente === patente ? PatenteStyles.selectedCard : null,
              ]}
            >
              <Card.Content>
                <Text style={PatenteStyles.cardTitle}>
                  Patente: {patente.id}
                </Text>
                <Text style={PatenteStyles.infoText}>
                  Estado: {translateEstado(patente.estado)}
                </Text>
                <Text style={PatenteStyles.infoText}>
                  Tipo Mantención: {patente.tipoMantencion}
                </Text>
                <Text style={PatenteStyles.infoText}>
                  Fecha: {formatDate(new Date(patente.fecha))}
                </Text>
                <Text style={PatenteStyles.infoText}>
                  Descripción: {patente.descripcion}
                </Text>
                <Text style={PatenteStyles.infoText}>
                  Kilometro de Mantención:{" "}
                  {formatoKilometraje(patente.kilometrajeMantencion)}
                </Text>
                <Text style={PatenteStyles.info}>Producto:</Text>
                {patente.productos && (
                  <View style={PatenteStyles.productContainer}>
                    {patente.productos.map((producto, index) => (
                      <Text key={index}> - {producto.nombreProducto}</Text>
                    ))}
                  </View>
                )}
              </Card.Content>
              {patente.estado !== "terminado" && (
                <Card.Actions style={PatenteStyles.tomarButton}>
                  <Button
                    mode="contained"
                    onPress={() => {
                      setModalVisible(true);
                      setSelectedPatente(patente);
                    }}
                    style={{ backgroundColor: "#4a7f8d" }}
                    labelStyle={{ color: "#fff" }}
                  >
                    Tomar Tarea
                  </Button>
                </Card.Actions>
              )}
            </Card>
          ))}
        </ScrollView>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <Card style={PatenteStyles.modalContainer}>
              <Card.Title
                title="Confirmar Tarea"
                titleStyle={{ color: "#4a7f8d" }}
              />
              <Card.Content>
                <Text>¿Estás seguro de que deseas tomar esta tarea?</Text>
                {selectedPatente && (
                  <Text style={{ marginTop: 10 }}>
                    Patente: {selectedPatente.id}
                  </Text>
                )}
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={handleCloseModal}
                  style={{
                    backgroundColor: "#fff",
                    borderColor: "#4a7f8d",
                  }}
                  labelStyle={{ color: "#4a7f8d" }}
                >
                  Cancelar
                </Button>
                <Button
                  onPress={tomarTarea}
                  style={{ backgroundColor: "#4a7f8d" }}
                  labelStyle={{ color: "#fff" }}
                >
                  Confirmar
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
          <Modal visible={confirmModalVisible} onDismiss={handleConfirmModal}>
            <Card style={PatenteStyles.modalContainer}>
              <Card.Title
                title="Tarea Tomada"
                titleStyle={{ color: "#4a7f8d" }}
              />
              <Card.Content>
                <Text>
                  La tarea ha sido tomada con éxito y está en proceso.
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={handleConfirmModal}
                  style={{ backgroundColor: "#4a7f8d" }}
                  labelStyle={{ color: "#fff" }}
                >
                  Aceptar
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default Patente;
