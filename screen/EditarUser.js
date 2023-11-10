import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Button, 
  ActivityIndicator, 
  Alert
} from "react-native";
import { 
  doc, 
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";

const EditarUser = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const identifyUser = auth.currentUser;

    if (identifyUser) {
      const userRef = doc(db, "users", identifyUser.uid);
      onSnapshot(userRef, (snapshot) => {
        setUserData(snapshot.data());
        setLoading(false);
      });
    }
  }, []);

  const actualizarDatosUsuario = async () => {
    try {
      const identifyUser = auth.currentUser;

      if (identifyUser) {
        const userDocRef = doc(db, "users", identifyUser.uid);
        await setDoc(userDocRef, { ...userData, nombre: newName }, { merge: true });
        console.log("Datos del usuario actualizados con éxito");
        Alert.alert("Datos del usuario actualizados con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
      Alert.alert("Error al actualizar datos del usuario:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Usuario</Text>
      {userData && (
        <View style={styles.userData}>
          <Text style={styles.userDataText}>Nombre: {userData.nombre}</Text>
          <Text style={styles.userDataText}>Apellido: {userData.apellido}</Text>
          <Text style={styles.userDataText}>Contraseña: {userData.password}</Text>
          <Text style={styles.userDataText}>Teléfono: {userData.telefono}</Text>
          <Text style={styles.userDataText}>Dirección: {userData.direccion}</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <Button title="Actualizar Datos" onPress={actualizarDatosUsuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userData: {
    marginBottom: 20,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
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
});

export default EditarUser;