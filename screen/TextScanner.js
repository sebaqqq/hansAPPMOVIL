import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Linking,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from "react";

export default function Scaner() {
  const [hasPermission, setHasPermission] = useState([]);
  const [scanned, setScanned] = useState([]);

  useEffect(() => {
      (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync([]);
          setHasPermission(status === 'granted');
      })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Código de barras con tipo ${type} y data ${Linking.openURL(`${data}`)} ha sido escaneado!`);
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
            onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
            style={styles.escaner}
        />
        {scanned && <TouchableOpacity
            onPress={() => setScanned(false)}
            style={styles.boton}>
            <Text style={styles.botonText}>Presione para Escanear</Text>
        </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  escaner: {
    height: '90%',
    width: '100%',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  boton: {
    width: '90%',
    height: 50,
    borderColor: '#0077B6',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 40,
    padding: 6,
    marginTop: 20,
    backgroundColor: '#0077B6',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
  },
  botonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});