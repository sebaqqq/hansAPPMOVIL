import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  ScrollView
} from "react-native";
import { 
  doc, 
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { updatePassword as updateFirebasePassword } from "firebase/auth";

const EditarUser = () => {
  const [userData, setUserData] = useState(null);
  const [newName, setNewName] = useState("");
  const [newApellido, setNewApellido] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [newDireccion, setNewDireccion] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const identifyUser = auth.currentUser;
  
    if (identifyUser) {
      const userRef = doc(db, "users", identifyUser.uid);
      onSnapshot(userRef, (snapshot) => {
        const userData = snapshot.data();
        setUserData(userData);
        setNewName(userData.nombre || "");
        setNewApellido(userData.apellido || "");
        setNewPassword(userData.password || "");
        setNewTelefono(userData.telefono || "");
        setNewDireccion(userData.direccion || "");
        setLoading(false);
      });
    }
  }, []);

  const actualizarDatosUsuario = async () => {
    try {
      const identifyUser = auth.currentUser;
  
      if (identifyUser) {
        const userDocRef = doc(db, "users", identifyUser.uid);
  
        const updatedUserData = {
          nombre: newName || userData.nombre,
          apellido: newApellido || userData.apellido,
          telefono: newTelefono || userData.telefono,
          direccion: newDireccion || userData.direccion,
        };
  
        await setDoc(userDocRef, updatedUserData, { merge: true });
  
        if (newPassword) {
          await updateFirebasePassword(identifyUser, newPassword);
          console.log("Contraseña actualizada con éxito");
        }
  
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
        <ActivityIndicator size="large" color="#0077B6" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Editar Usuario</Text>
        <Text style={styles.text}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={newName}
          onChangeText={(text) => setNewName(text)}
        />
        <Text style={styles.text}>Apellido</Text>
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={newApellido}
          onChangeText={(text) => setNewApellido(text)}
        />
        <Text style={styles.text}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Text style={styles.text}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={newTelefono}
          onChangeText={(text) => setNewTelefono(text)}
        />
        <Text style={styles.text}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={newDireccion}
          onChangeText={(text) => setNewDireccion(text)}
        />
        <TouchableOpacity onPress={actualizarDatosUsuario} style={styles.boton}>
          <Text>Actualizar Datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    borderRadius: 8,
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
  boton: {
    backgroundColor: "#00cc00",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});

export default EditarUser;