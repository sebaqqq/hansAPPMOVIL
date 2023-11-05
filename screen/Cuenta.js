import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';

import { auth, db } from "../firebase";
import { collection, onSnapshot, query, addDoc, doc } from "firebase/firestore";

function Cuenta() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setUser(
          querySnapshot.docs.map((doc) => ({
              id: doc.id,
              rut : doc.data().rut,
              nombre : doc.data().nombre,
              apellido : doc.data().apellido,
              direccion : doc.data().direccion,
              email : doc.data().email
            })
          )
        );
      });
      return unsubscribe;
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
    <View>
      <Button title="Cerrar sesión" onPress={handleSignOut} />
      {!user ? (
          <Text>No hay datos</Text>
      ) : (
          <View style={{ margin: 20, }}>
              {user.map((user) => (
                <View key={user.id}>
                  <Text>Datos Usuario</Text>
                  <Text>Rut: {user.rut}</Text>
                  <Text>Nombre: {user.nombre}</Text>
                  <Text>Apellido: {user.apellido}</Text>
                  <Text>Direccion: {user.direccion}</Text>
                  <Text>Email: {user.email}</Text>
                </View>
              ))}
          </View>
      )}
    </View>
  );
}

export default Cuenta;