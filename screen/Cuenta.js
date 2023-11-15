import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

function Perfil() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const identifyUser = auth.currentUser;
    if (identifyUser) {
      const userRef = doc(db, "users", identifyUser.uid);
      onSnapshot(userRef, (snapshot) => {
        setUser(snapshot.data());
        setLoading(false);
      });
    }
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        Alert.alert("Cuenta cerrada");
      })
      .catch((error) => alert(error.message));
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
    <View style={styles.credencialContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>Hans Motors</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate("Editar Usuario")}
          >
            <MaterialIcons name="settings" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <MaterialIcons name="exit-to-app" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {!user ? (
        <Text>No hay datos</Text>
      ) : (
        <View style={styles.profileContainer}>
          <Text style={styles.subtitle}>Credencial de Usuario</Text>
          <Text style={styles.meca}>Mecánico</Text>

          <View style={styles.qrCodeContainer}>
            <QRCode
              value={`Rut: ${user.rut}\nNombre: ${user.nombre} ${user.apellido}\nDirección: ${user.direccion}\nEmail: ${user.email}`}
              size={150}
            />
          </View>

          <View style={styles.section}>
            <FontAwesome name="id-card-o" size={20} rightg={80} color="#0077B6" />
            <Text style={styles.label}>RUT:</Text>
            <Text style={styles.text}>{user.rut}</Text>
          </View>
          <View style={styles.section}>
            <FontAwesome name="user" size={20} color="#0077B6" />
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.text}>{user.nombre} {user.apellido}</Text>
          </View>
          <View style={styles.section}>
            <FontAwesome name="map-marker" size={20} color="#0077B6" />
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.text}>{user.direccion}</Text>
          </View>
          <View style={styles.section}>
            <FontAwesome name="envelope-o" size={20} color="#0077B6" />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  credencialContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    margin: 10,
    padding: 20,
    elevation: 3,
    minHeight: 100, // Ajusta la altura según tus necesidades
    width: '90%', // Ajusta el ancho según tus necesidades
    alignSelf: 'center', // Centra la credencial en el centro horizontal de la pantalla
    justifyContent: 'center', // Centra la credencial verticalmente en la pantalla
    marginTop: 'auto', // Coloca la credencial en la mitad de la pantalla
    marginBottom: 'auto', // Coloca la credencial en la mitad de la pantalla
  },
  headerContainer: {
    backgroundColor: "#0077B6",
    height: 90,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  meca: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Mover los iconos a la derecha
    marginBottom: 15,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#0077B6",
    textAlign: "center",
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: "#0077B6",
    textAlign: "center",
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: 15,
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

export default Perfil;