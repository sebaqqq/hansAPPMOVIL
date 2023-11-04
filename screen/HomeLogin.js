import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

function HomeLogin() {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Login</Text>

      <Button title="Cerrar sesión" onPress={handleSignOut} />
    </View>
  );
}

export default HomeLogin;