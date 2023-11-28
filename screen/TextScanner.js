// Componente Scanner:
// Este componente React Native utiliza la cámara del dispositivo para escanear códigos QR. Luego, verifica la patente asociada en la base de datos Firebase y muestra la información de la mantención correspondiente.
// Características Principales:
// - Utiliza el componente `BarCodeScanner` de `expo-barcode-scanner` para escanear códigos QR.
// - Verifica la información asociada con la patente en Firebase.
// - Actualiza automáticamente los datos cada 10 segundos utilizando un intervalo.
// - Muestra un mensaje de error si la patente no es válida o no se encuentra.
// - Permite reiniciar el escaneo mediante un botón.
// - Proporciona feedback visual al escanear y al reiniciar.

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCheckPatente = async (text) => {
    try {
      if (typeof text !== 'string' || text.trim() === '') {
        setErrorMessage('La patente no es válida.');
        return;
      }

      const mantencionDocRef = doc(db, 'mantenciones', text);
      const mantencionDocSnapshot = await getDoc(mantencionDocRef);

      if (mantencionDocSnapshot.exists()) {
        const mantencionData = mantencionDocSnapshot.data();
        console.log(mantencionData);
        navigation.navigate('Datos Escaneados', { mantencionData });
      } else {
        setErrorMessage('No se encontró una mantención con esa patente');
      }
    } catch (error) {
      console.error('Error al verificar la patente:', error.message);
      setErrorMessage('Error al verificar la patente. Inténtelo de nuevo.');
    } finally {
      setIsScanning(true);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    if (isScanning) {
      setIsScanning(false);
      handleCheckPatente(data);
    }
  };

  useEffect(() => {
    handleCheckPatente();
    const intervalId = setInterval(() => {
      handleCheckPatente();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [refresh]); // Agrega refresh a las dependencias del useEffect

  const resetScanner = () => {
    setIsScanning(true);
    setErrorMessage('');
    setRefresh((prevRefresh) => !prevRefresh);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de Cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        key={refresh}
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.label}>Escanea el código QR</Text>
        <TouchableOpacity onPress={resetScanner} style={styles.button}>
          <Text style={styles.buttonText}>Reiniciar Escaneo</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#0077B6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});