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
} from "react-native";
import { db, auth } from "../firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  onSnapshot, 
  updateDoc,
  getDoc
} from "firebase/firestore";
import { Foundation } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons'; 

const Patente = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patentes, setPatentes] = useState([]);
  const [filtroPatente, setFiltroPatente] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPatente, setSelectedPatente] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="inventory"
          size={26}
          right={20}
          color="#0077B6"
          onPress={() => navigation.navigate('Inventario')}
        />
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
  
      setPatentes(patentesFiltradas);
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
            <Foundation name="clock" size={24} left={12} color="#FFFFFF" />
            {item.estado}
          </Text>
        </View>
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
            "Tarea ya tomada",
            "Esta tarea ya ha sido tomada por otra persona."
          );
          return;
        }
  
        // Actualiza la tarea seleccionada con la información de la persona que toma la tarea
        await updateDoc(patenteRef, {
          personaTomadora: identifyUser.uid,
          estado: "en proceso", // Cambia el estado a "En proceso"
        });
  
        // Vuelve a cargar los datos después de tomar la tarea
        await recargarDatos();
  
        // Oculta la tarjeta después de tomar la tarea
        hideTarjeta();
      }
    } catch (error) {
      console.error("Error al tomar tarea:", error);
      Alert.alert("Error", "Hubo un error al tomar la tarea.");
    }
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
          <Picker.Item label="En proceso" value="en proceso" />
          <Picker.Item label="Terminado" value="terminados" />
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

export default Patente;
