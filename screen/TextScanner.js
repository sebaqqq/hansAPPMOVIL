import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [patente, setPatente] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCheckPatente = async (text) => {
    try {
      // Verificar si el texto es una cadena no vacía
      if (typeof text !== 'string' || text.trim() === '') {
        setErrorMessage('La patente no es válida.');
        return;
      }

      setPatente(text);
      const mantencionDocRef = doc(db, 'mantenciones', text);
      const mantencionDocSnapshot = await getDoc(mantencionDocRef);

      if (mantencionDocSnapshot.exists()) {
        const mantencionData = mantencionDocSnapshot.data();
        // setErrorMessage(`Mantención encontrada. Datos: ${JSON.stringify(mantencionData)}`);
        console.log(mantencionData);

        // Navegar a la pantalla "DatosEscaneados" con los datos escaneados
        navigation.navigate('Datos Escaneados', { mantencionData });
      } else {
        setErrorMessage('No se encontró una mantención con esa patente');
      }
    } catch (error) {
      console.error('Error al verificar la patente:', error.message);
      setErrorMessage('Error al verificar la patente. Inténtelo de nuevo.');
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    handleCheckPatente(data);
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
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <Text style={styles.label}>Escanea el código QR</Text>
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
          <Text style={styles.buttonText}>Cancelar Escaneo</Text>
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