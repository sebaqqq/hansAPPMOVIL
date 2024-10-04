import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { TexTScannerStyles } from "../styles/TexTScannerEstilo";
import { Button } from "react-native-paper";
import MLKitOCR from "react-native-mlkit-ocr"; // Importar el módulo de OCR
import * as ImagePicker from 'expo-image-picker';

export default function Scanner() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [ocrText, setOcrText] = useState(""); // Estado para el texto escaneado
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCheckPatente = async (text) => {
    try {
      if (typeof text !== "string" || text.trim() === "") {
        setErrorMessage("La patente no es válida.");
        return;
      }
      const patente = text.split("-")[0];
      
      // Consulta para obtener todas las tareas con la misma patente
      const q = query(collection(db, "mantenciones"), where("patente", "==", patente));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const tareas = [];
        querySnapshot.forEach((doc) => {
          tareas.push(doc.data());
        });
        navigation.navigate("Datos Escaneados", { tareas });
      } else {
        setErrorMessage("No se encontró una mantención con esa patente");
      }
    } catch (error) {
      console.error("Error al verificar la patente:", error.message);
      setErrorMessage("Error al verificar la patente. Inténtelo de nuevo.");
    } finally {
      setIsScanning(true);
    }
  };

  // Función para manejar el OCR
  const handleTextRecognition = async (imageUri) => {
    try {
      const recognizedText = await MLKitOCR.detectFromUri(imageUri);
      const textResult = recognizedText.map(block => block.text).join(" ");
      setOcrText(textResult); // Guardar el texto reconocido
      handleCheckPatente(textResult); // Verificar el texto reconocido
    } catch (error) {
      console.error("Error al reconocer el texto:", error);
      setErrorMessage("Error al reconocer el texto. Inténtelo de nuevo.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      handleTextRecognition(result.uri); // Pasar la imagen seleccionada
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    if (isScanning) {
      setIsScanning(false);
      handleCheckPatente(data); // Aquí es donde se procesaría el código de barras escaneado
    }
  };

  useEffect(() => {
    handleCheckPatente();
    const intervalId = setInterval(() => {
      handleCheckPatente();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [refresh]);
  
  const resetScanner = () => {
    setIsScanning(true);
    setErrorMessage("");
    setOcrText(""); // Reiniciar el texto OCR
    setRefresh((prevRefresh) => !prevRefresh);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso de Cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={TexTScannerStyles.container}>
      <BarCodeScanner
        key={refresh}
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={TexTScannerStyles.overlay}>
        <Text style={TexTScannerStyles.label}>Escanea el código QR</Text>
        <Button mode="contained" onPress={resetScanner} style={{ backgroundColor: "#4a7f8d" }}>
          Reiniciar Escaneo
        </Button>
        <Button mode="contained" onPress={pickImage} style={{ backgroundColor: "#4a7f8d" }}>
          Reconocer Texto
        </Button>
        {ocrText ? <Text style={TexTScannerStyles.textResult}>{ocrText}</Text> : null}
      </View>
      {errorMessage ? (
        <Text style={TexTScannerStyles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
