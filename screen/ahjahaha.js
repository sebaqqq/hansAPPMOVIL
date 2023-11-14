import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    try {
      const mantencionesRef = collection(db, 'mantenciones');
      const q = query(mantencionesRef, where('patente', '==', data));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        showAlert(`Patente con valor ${data} no encontrada en la colección.`);
      } else {
        querySnapshot.forEach((doc) => {
          const mantencionData = doc.data();
          showAlert(`Patente con valor ${data} encontrada. Datos: ${JSON.stringify(mantencionData)}`);

          // Navigate to the 'DatosEscaneados' screen after a successful scan
          navigation.navigate('Datos Escaneados', { data: mantencionData });
        });
      }
    } catch (error) {
      console.error('Error handling barcode scan:', error);
      showAlert('Error al procesar el código de barras. Inténtelo de nuevo.');
    }
  };

  const showAlert = (message) => {
    Alert.alert('Alerta', message, [{ text: 'OK', onPress: () => setScanned(false) }]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
        <Text style={styles.buttonText}>Presione para Escanear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scanner: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0077B6',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});