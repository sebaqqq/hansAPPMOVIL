import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error al solicitar permisos de cámara:', error);
      }
    })();
  }, []);

  const handleTextDetected = async ({ data }) => {
    console.log('Texto detectado:', data);

    try {
      // Realizar una consulta a la colección "mantenciones" con el texto escaneado
      const mantencionesRef = doc(db, 'mantenciones', data);
      const mantencionesSnapshot = await getDoc(mantencionesRef);

      if (mantencionesSnapshot.exists()) {
        // El texto escaneado coincide con una patente en la colección
        console.log('Texto escaneado coincide con una patente en la colección.');
        // Aquí puedes realizar las acciones adicionales que necesites.
      } else {
        console.log('Texto escaneado no coincide con ninguna patente en la colección.');
      }
    } catch (error) {
      console.error('Error al consultar la colección:', error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        onBarCodeScanned={handleTextDetected}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Cambiar cámara</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Scanner;
