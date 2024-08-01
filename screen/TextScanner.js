import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { TexTScannerStyles } from "../styles/TexTScannerEstilo";
import { Button } from "react-native-paper";

export default function Scanner() {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

      const mantencionDocRef = doc(db, "historialMantencion", text);
      const mantencionDocSnapshot = await getDoc(mantencionDocRef);

      if (mantencionDocSnapshot.exists()) {
        const mantencionData = mantencionDocSnapshot.data();
        console.log(mantencionData);
        navigation.navigate("Datos Escaneados", { mantencionData });
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
  }, [refresh]);

  const resetScanner = () => {
    setIsScanning(true);
    setErrorMessage("");
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
        <Button mode="contained" onPress={resetScanner}>
          Reiniciar Escaneo
        </Button>
      </View>
      {errorMessage ? (
        <Text style={TexTScannerStyles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
