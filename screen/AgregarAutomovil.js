import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { AgregarAutomovilStyles } from "../styles/AgregarAutomovilEstilo";
import ValidadorPatente from "../hooks/validadorPatente";
import ValidadorVIN from "../hooks/validadorVIN";
import { Button, TextInput } from "react-native-paper";

function AgregarAutomovil({ route }) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [color, setColor] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [numchasis, setNumChasis] = useState("");
  const [patente, setPatente] = useState("");
  const [mensajePatente, setMensajePatente] = useState("");
  const [mensajePatenteError, setMensajePatenteError] = useState("");
  const [mensajeChasis, setMensajeChasis] = useState("");
  const [mensajeChasisError, setMensajeChasisError] = useState("");
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.patente) {
      setPatente(route.params.patente);
    }
  }, [route.params]);

  const showConfirmationModal = () => {
    setConfirmationModalVisible(true);
  };

  const hideConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const handleConfirmationAndSave = () => {
    hideConfirmationModal();
    agregarAutomovil();
  };

  const agregarAutomovil = async () => {
    try {
      const automovilRef = doc(db, "automoviles", patente);
      const automovilDoc = await getDoc(automovilRef);
      if (automovilDoc.exists()) {
        await setDoc(automovilRef, {
          marca,
          modelo,
          ano,
          color,
          kilometraje,
          numchasis,
          timestamp: serverTimestamp(),
        });
        console.log("Automovil updated with Patente (ID): ", patente);
      } else {
        await setDoc(automovilRef, {
          marca,
          modelo,
          ano,
          color,
          kilometraje,
          numchasis,
          timestamp: serverTimestamp(),
        });
        console.log("New automovil added with Patente (ID): ", patente);
      }

      setMarca("");
      setModelo("");
      setAno("");
      setColor("");
      setKilometraje("");
      setNumChasis("");
      setPatente("");
      Alert.alert("Automovil agregado correctamente");
      navigation.navigate("Agregar Mantencion");
    } catch (error) {
      console.error("Error adding/updating automovil: ", error);
    }
  };

  const validarPatenteOnChange = (text) => {
    setPatente(text.toUpperCase().trim());
    const validador = new ValidadorPatente(text);

    if (validador.esValido) {
      setMensajePatente("Patente válida");
      setMensajePatenteError("");
      setTimeout(() => setMensajePatente(""), 2000);
    } else {
      setMensajePatenteError("Patente inválida");
      setMensajePatente("");
      setTimeout(() => setMensajePatenteError(""), 8000);
    }
  };

  const validarChasisOnChange = (text) => {
    const vin = text.toUpperCase().trim();
    setNumChasis(vin);

    const validadorVIN = new ValidadorVIN(vin);
    const { esValido, mensajeError } = validadorVIN.validarVIN();

    if (!esValido) {
      setMensajeChasisError(mensajeError);
      setMensajeChasis("");
    } else {
      setMensajeChasis("Chasis válido");
      setMensajeChasisError("");
    }
  };

  return (
    <ScrollView>
      <View style={AgregarAutomovilStyles.container}>
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Marca</Text>
        <Picker
          selectedValue={marca}
          onValueChange={(itemValue) => setMarca(itemValue)}
          style={AgregarAutomovilStyles.picker}
        >
          <Picker.Item label="Seleccione una marca" value="" />
          <Picker.Item label="Toyota" value="Toyota" />
          <Picker.Item label="Honda" value="Honda" />
          <Picker.Item label="Ford" value="Ford" />
          <Picker.Item label="Chevrolet" value="Chevrolet" />
          <Picker.Item label="Volkswagen" value="Volkswagen" />
          <Picker.Item label="Nissan" value="Nissan" />
          <Picker.Item label="Hyundai" value="Hyundai" />
          <Picker.Item label="Suzuki" value="Suzuki" />
          <Picker.Item label="Kia" value="Kia" />
          <Picker.Item label="Mazda" value="Mazda" />
          <Picker.Item label="Mitsubishi" value="Mitsubishi" />
          <Picker.Item label="Subaru" value="Subaru" />
          <Picker.Item label="Citroën" value="Citroën" />
          <Picker.Item label="Peugeot" value="Peugeot" />
          <Picker.Item label="Audi" value="Audi" />
          <Picker.Item label="BMW" value="BMW" />
          <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz" />
          <Picker.Item label="Fiat" value="Fiat" />
          <Picker.Item label="Chery" value="Chery" />
          <Picker.Item label="Dodge" value="Dodge" />
          <Picker.Item label="Geely" value="Geely" />
          <Picker.Item label="JAC" value="JAC" />
          <Picker.Item label="Jeep" value="Jeep" />
          <Picker.Item label="MG" value="MG" />
          <Picker.Item label="Mini" value="Mini" />
          <Picker.Item label="Ram" value="Ram" />
          <Picker.Item label="SsangYong" value="SsangYong" />
          <Picker.Item label="BYD" value="BYD" />
          <Picker.Item label="Changan" value="Changan" />
          <Picker.Item label="Chrysler" value="Chrysler" />
          <Picker.Item label="Dongfeng" value="Dongfeng" />
          <Picker.Item label="Foton" value="Foton" />
          <Picker.Item label="GAC" value="GAC" />
          <Picker.Item label="Great Wall" value="Great Wall" />
          <Picker.Item label="Haval" value="Haval" />
          <Picker.Item label="JMC" value="JMC" />
          <Picker.Item label="Lifan" value="Lifan" />
          <Picker.Item label="Mahindra" value="Mahindra" />
          <Picker.Item label="Opel" value="Opel" />
          <Picker.Item label="Renault" value="Renault" />
          <Picker.Item label="Skoda" value="Skoda" />
          <Picker.Item label="Tata" value="Tata" />
          <Picker.Item label="Volvo" value="Volvo" />
          <Picker.Item label="Alfa Romeo" value="Alfa Romeo" />
          <Picker.Item label="BAIC" value="BAIC" />
          <Picker.Item label="Brilliance" value="Brilliance" />
        </Picker>
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Modelo</Text>
        <TextInput
          style={AgregarAutomovilStyles.input}
          placeholder="Modelo"
          label={"Modelo"}
          value={modelo}
          onChangeText={(text) => setModelo(text)}
          mode="outlined"
          theme={{
            colors: {
              primary: '#3a798b',
              underlineColor: 'transparent',
              text: '#000000',
              background: '#ffffff',
            },
          }}
        />
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Año</Text>
        <TextInput
          style={AgregarAutomovilStyles.input}
          placeholder="Año"
          label={"Año"}
          value={ano}
          keyboardType="numeric"
          onChangeText={(text) => setAno(text)}
          mode="outlined"
          theme={{
            colors: {
              primary: '#3a798b',
              underlineColor: 'transparent',
              text: '#000000',
              background: '#ffffff',
            },
          }}
        />
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Color</Text>
        <TextInput
          style={AgregarAutomovilStyles.input}
          placeholder="Color"
          label={"Color"}
          value={color}
          onChangeText={(text) => setColor(text)}
          mode="outlined"
          theme={{
            colors: {
              primary: '#3a798b',
              underlineColor: 'transparent',
              text: '#000000',
              background: '#ffffff',
            },
          }}
        />
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Patente</Text>
        <TextInput
          style={AgregarAutomovilStyles.input}
          placeholder="Patente"
          label={"Patente"}
          autoCapitalize="characters"
          keyboardType="ascii-capable"
          value={patente}
          onChangeText={validarPatenteOnChange}
          mode="outlined"
          theme={{
            colors: {
              primary: '#3a798b',
              underlineColor: 'transparent',
              text: '#000000',
              background: '#ffffff',
            },
          }}
        />
        {mensajePatente ? <Text>{mensajePatente}</Text> : null}
        {mensajePatenteError ? <Text>{mensajePatenteError}</Text> : null}
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Número de Chasis</Text>
        <TextInput
          style={AgregarAutomovilStyles.input}
          placeholder="Número de Chasis"
          label={"Número de Chasis"}
          autoCapitalize="characters"
          keyboardType="ascii-capable"
          value={numchasis}
          onChangeText={validarChasisOnChange}
          mode="outlined"
          theme={{
            colors: {
              primary: '#3a798b',
              underlineColor: 'transparent',
              text: '#000000',
              background: '#ffffff',
            },
          }}
        />
        {mensajeChasis ? <Text>{mensajeChasis}</Text> : null}
        {mensajeChasisError ? <Text>{mensajeChasisError}</Text> : null}
        <Text style={AgregarAutomovilStyles.nombreCategoria}>Kilometraje</Text>
        <TextInput
          style={AgregarAutomovilStyles.input}
          placeholder="Kilometraje"
          label={"Kilometraje"}
          value={kilometraje}
          onChangeText={(text) => setKilometraje(text)}
          keyboardType="numeric"
          mode="outlined"
          theme={{
            colors: {
              primary: '#3a798b',
              underlineColor: 'transparent',
              text: '#000000',
              background: '#ffffff',
            },
          }}
        />
        <Button
          style={AgregarAutomovilStyles.button}
          onPress={showConfirmationModal}
          mode="contained"
        >
          Agregar Automóvil
        </Button>
        <Modal
          isVisible={isConfirmationModalVisible}
          onBackdropPress={hideConfirmationModal}
        >
          <View style={AgregarAutomovilStyles.confirmationModal}>
            <Text style={AgregarAutomovilStyles.confirmationModalText}>
              ¿Estás seguro de que deseas guardar esta información?
            </Text>
            <TouchableOpacity onPress={handleConfirmationAndSave}>
              <Text style={AgregarAutomovilStyles.confirmationModalButton}>
                Sí, Guardar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideConfirmationModal}>
              <Text style={AgregarAutomovilStyles.confirmationModalButton}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export default AgregarAutomovil;
