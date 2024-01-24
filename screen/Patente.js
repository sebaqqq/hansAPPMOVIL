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
            size={26}
            color="#0077B6"
            onPress={() => navigation.navigate("Inventario")}
          />
          <FontAwesome5
            name="history"
            size={26}
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
        return userData;
      });
    }
  }, []);

  const recargarDatos = async () => {
    setLoading(true);
    setError(null);

    try {
      const patentesSnapshot = await getDocs(collection(db, "mantenciones"));
      const nuevasPatentes = patentesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filtrar las patentes en proceso
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
        <View style={styles.statusContainer}>
          <Text style={styles.status}>
            <Foundation name="clock" size={24} left={45} color="#FFFFFF" />
            {item.estado}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredPatentes = patentes.filter(
    (item) =>
      item.id.toLowerCase().includes(filtroPatente.toLowerCase()) &&
      (!selectedCategory ||
        item.estado.toLowerCase() === selectedCategory.toLowerCase())
  );

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

        // Obtiene la tarea actualizada antes de tomarla
        const patenteSnapshot = await getDoc(patenteRef);
        const patenteData = patenteSnapshot.data();

        // Verifica si la tarea ya ha sido tomada por alguien más
        if (patenteData.personaTomadora) {
          Alert.alert(
            "Tarea ya Tomada",
            "Esta tarea ya ha sido tomada por otra persona."
          );
          return;
        }

        // Verifica si la tarea ya está marcada como "terminado"
        if (patenteData.estado === "terminado") {
          Alert.alert(
            "Tarea Terminada",
            "Esta tarea ya ha sido marcada como terminada y no se puede tomar de nuevo."
          );
          return;
        }

        // Actualiza la tarea seleccionada con la información de la persona que toma la tarea
        await updateDoc(patenteRef, {
          personaTomadora: identifyUser.uid,
          estado: "en proceso", // Cambia el estado a "En proceso"
        });

        await recargarDatos();

        setModalVisible(true);
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

  const confirmTomarTarea = async () => {
    setConfirmModalVisible(false);
    // Call your existing tomarTarea function here
    await tomarTarea();
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
          <Picker.Item label="Terminado" value="terminado" />
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
                <Text style={styles.patenteText}>{item.id}</Text>
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
                  <TouchableOpacity onPress={tomarTarea} style={styles.tomarTarea}>
                    <Text style={styles.textTomarTarea}>Tomar Tarea</Text>
                  </TouchableOpacity>

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmModalVisible}
                    onRequestClose={() => setConfirmModalVisible(!confirmModalVisible)}
                  >
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalText}>
                        ¿Estás seguro de tomar esta tarea?
                      </Text>
                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          onPress={() => setConfirmModalVisible(!confirmModalVisible)}
                          style={[styles.closeModal, { backgroundColor: "#FF3333" }]}
                        >
                          <Text style={styles.closeText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmTomarTarea} style={styles.closeModal}>
                          <Text style={styles.closeText}>Confirmar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </ScrollView>

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={confirmModalVisible}
          onRequestClose={() => setConfirmModalVisible(!confirmModalVisible)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              ¿Estás seguro de tomar esta tarea?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setConfirmModalVisible(!confirmModalVisible)}
                style={[styles.closeModal, { backgroundColor: "#FF3333" }]}
              >
                <Text style={styles.closeText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmTomarTarea} style={styles.closeModal}>
                <Text style={styles.closeText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
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
    borderRadius: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  closeModal: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Patente;
