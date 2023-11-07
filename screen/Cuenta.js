import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Alert } from 'react-native';
import { auth, db } from "../firebase";
import { 
  collection, 
  onSnapshot, 
  query, 
  addDoc, 
  doc 
} from "firebase/firestore";

function Cuenta() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    const identyfyUser = auth.currentUser;
    if (identyfyUser) {
      const userRef = doc(db, "users", identyfyUser.uid);
      onSnapshot(userRef, (snapshot) => {
        setUser(snapshot.data());
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
  
  return (
    <View style={{backgroundColor: "#fff", paddingBottom: '100%'}}>
      <View style={style.encabezado}>
        <Text style={style.logo}>Hans Motors</Text>
      </View>
      {!user ? (
        <Text>No hay datos</Text>
      ) : (
        <View>
          <View style={style.container}>
            <View>
              <Text style={style.title}>Credencial Usuario</Text>
            </View>
            <Text style={style.subtitle}>Rut:</Text>
            <View>
              <Text style={style.texto}>{user.rut}</Text>
            </View>
            <Text style={style.subtitle}>Nombre:</Text>
            <View>
              <Text style={style.texto}>{user.nombre} {user.apellido}</Text>
            </View>
            <Text style={style.subtitle}>Direccion:</Text>
            <View>
              <Text style={style.texto}>{user.direccion}</Text>
            </View>
            <Text style={style.subtitle}>Email:</Text>
            <View>
              <Text style={style.texto}>{user.email}</Text>
            </View>
            <TouchableOpacity style={style.boton} onPress={handleSignOut}>
              <Text style={style.botonTexto}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  encabezado:{
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: '15%',
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: '30%',
    color: "#525FE1",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 8,
  },
  texto: {
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#525FE1',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 40,
  },
  botonTexto: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 15,
  },
});

export default Cuenta;