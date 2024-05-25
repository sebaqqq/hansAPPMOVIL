import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { Foundation } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { PatenteStyles } from "../styles/PatenteEstilo";

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
            color="#0077B6"
            onPress={() => navigation.navigate("Inventario")}
          />
          <FontAwesome5
            name="history"
            size={24}
            style={{ marginLeft: 20 }}
            color="#0077B6"
            onPress={() => navigation.navigate("Historial Patente")}
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

      const patentesFiltradas = nuevasPatentes.filter(
        (patente) => patente.estado !== "en proceso"
      );

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
  }, []);

  useEffect(() => {
    recargarDatos();
  }, [recargarDatos]);

  const handleContainerPress = () => {
    setSelectedPatente(null);
  };

  const selectPatente = (patente) => {
    setSelectedPatente(selectedPatente === patente ? null : patente);
  };

  const renderItem = ({ item }) => {
    if (
      (filtroPatente &&
        !item.id.toLowerCase().includes(filtroPatente.toLowerCase())) ||
      (selectedCategory &&
        item.estado.toLowerCase() !== selectedCategory.toLowerCase())
    ) {
      return null;
    }

    return (
      <TouchableOpacity
        style={PatenteStyles.patenteItem}
        onPress={() => selectPatente(item)}
      >
        <Text style={PatenteStyles.patenteText}>Patente: {item.id}</Text>
        <View style={PatenteStyles.statusContainer}>
          <Text style={PatenteStyles.status}>
            <Foundation name="clock" size={24} color="#FFFFFF" />
            {item.estado}
          </Text>
        </View>
      </TouchableOpacity>
    );
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

        setModalVisible(true);

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

  const confirmTomarTarea = async () => {
    setConfirmModalVisible(false);
    await tomarTarea();
  };

  const renderConfirmModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={confirmModalVisible}
      onRequestClose={() => setConfirmModalVisible(false)}
    >
      <View style={PatenteStyles.modalContainer}>
        <View style={PatenteStyles.modalContent}>
          <Text style={PatenteStyles.modalText}>
            ¿Estás seguro de tomar esta tarea?
          </Text>
          <View style={PatenteStyles.modalButtons}>
            <TouchableOpacity
              onPress={confirmTomarTarea}
              style={PatenteStyles.closeModal}
            >
              <Text style={PatenteStyles.closeText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConfirmModalVisible(false)}
              style={[PatenteStyles.closeModal, { backgroundColor: "#FF3333" }]}
            >
              <Text style={PatenteStyles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={PatenteStyles.container}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={PatenteStyles.filterInput}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Prioridad" value="prioridad" />
          <Picker.Item label="Atención Especial" value="atencion especial" />
          <Picker.Item label="En proceso" value="en proceso" />
          <Picker.Item label="Terminado" value="terminado" />
        </Picker>
        <TextInput
          style={PatenteStyles.input}
          onChangeText={setFiltroPatente}
          value={filtroPatente}
          placeholder="Filtrar por patente"
          autoCapitalize="characters"
          keyboardType="ascii-capable"
        />
        <ScrollView
          contentContainerStyle={PatenteStyles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={PatenteStyles.content}>
            {patentes.map((item) => renderItem({ item }))}
            {selectedPatente && (
              <TouchableWithoutFeedback onPress={hideTarjeta}>
                <View style={[PatenteStyles.overlay, PatenteStyles.tarjeta]}>
                  <Text style={PatenteStyles.statusSelectPatente}>
                    {selectedPatente.estado}
                  </Text>
                  <Text style={PatenteStyles.info}>
                    Patente: {selectedPatente.id}
                  </Text>
                  <Text style={PatenteStyles.info}>
                    Mantención: {selectedPatente.tipoMantencion}
                  </Text>
                  <Text style={PatenteStyles.info}>
                    Fecha: {formatDate(new Date(selectedPatente.fecha))}
                  </Text>
                  <Text style={PatenteStyles.info}>
                    Descripción: {selectedPatente.descripcion}
                  </Text>
                  <Text style={PatenteStyles.info}>
                    Kilometraje de Mantencion:{" "}
                    {selectedPatente.kilometrajeMantencion}
                  </Text>
                  <Text style={PatenteStyles.info}>Producto:</Text>
                  {selectedPatente.productos && (
                    <View style={PatenteStyles.productContainer}>
                      {selectedPatente.productos.map((producto, index) => (
                        <Text key={index}> - {producto.nombreProducto}</Text>
                      ))}
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => setConfirmModalVisible(true)}
                    style={PatenteStyles.tomarTarea}
                  >
                    <Text style={PatenteStyles.textTomarTarea}>
                      Tomar Tarea
                    </Text>
                  </TouchableOpacity>
                  {renderConfirmModal()}
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Patente;
