import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';

import { auth } from "../firebase";

function Cuenta() {
  const navigation = useNavigation();
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
      <Text>Cuenta</Text>
      <Button title="Cerrar sesión" onPress={handleSignOut} />
    </View>
  );
}

export default Cuenta;