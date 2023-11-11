import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0077B6" />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Loading;