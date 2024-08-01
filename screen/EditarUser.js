import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, ScrollView } from "react-native";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { updatePassword as updateFirebasePassword } from "firebase/auth";
import { EditarUserStyles } from "../styles/EditarUserEstilo";
import { Button, TextInput } from "react-native-paper";

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
          password: newPassword || userData.password,
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
      <View style={EditarUserStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0077B6" />
        <Text style={EditarUserStyles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={EditarUserStyles.container}>
        <Text style={EditarUserStyles.textTitle}>Editar Usuario</Text>
        <Text style={EditarUserStyles.text}>Nombre</Text>
        <TextInput
          label="Nombre"
          value={newName}
          onChangeText={(text) => setNewName(text)}
          style={EditarUserStyles.input}
          mode="outlined"
        />
        <Text style={EditarUserStyles.text}>Apellido</Text>
        <TextInput
          label="Apellido"
          value={newApellido}
          onChangeText={(text) => setNewApellido(text)}
          style={EditarUserStyles.input}
          mode="outlined"
        />
        <Text style={EditarUserStyles.text}>Contraseña</Text>
        <TextInput
          label="Contraseña"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          style={EditarUserStyles.input}
          mode="outlined"
        />
        <Text style={EditarUserStyles.text}>Teléfono</Text>
        <TextInput
          label="Teléfono"
          value={newTelefono}
          onChangeText={(text) => setNewTelefono(text)}
          style={EditarUserStyles.input}
          mode="outlined"
        />
        <Text style={EditarUserStyles.text}>Dirección</Text>
        <TextInput
          label="Dirección"
          value={newDireccion}
          onChangeText={(text) => setNewDireccion(text)}
          style={EditarUserStyles.input}
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={actualizarDatosUsuario}
          style={EditarUserStyles.boton}
        >
          Actualizar Datos
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditarUser;
