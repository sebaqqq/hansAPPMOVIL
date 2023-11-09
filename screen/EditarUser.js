import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditarUser = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editar Usuario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EditarUser;