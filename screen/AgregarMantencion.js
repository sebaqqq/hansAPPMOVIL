import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5} from "@expo/vector-icons";

function AgrergarMantencion() {
  const [patente, setPatente] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTerminoEstimada, setFechaTerminoEstimada] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costoEstimado, setCostoEstimado] = useState('');

  const navigation = useNavigation();

  const handleInputChange = (field, text) => {
    switch (field) {
      case 'patente':
        setPatente(text);
        break;
      case 'fechaInicio':
        setFechaInicio(text);
        break;
      case 'fechaTerminoEstimada':
        setFechaTerminoEstimada(text);
        break;
      case 'descripcion':
        setDescripcion(text);
        break;
      case 'costoEstimado':
        setCostoEstimado(text);
        break;
      default:
        break;
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome5
          name="car-alt"
          size={24}
          color="#5b6f7f"
          onPress={() => navigation.navigate("AgregarAutomovil")}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="car" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Patente del auto"
          value={patente}
          onChangeText={(text) => handleInputChange('patente', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="calendar" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio"
          value={fechaInicio}
          onChangeText={(text) => handleInputChange('fechaInicio', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="calendar" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Fecha estimada de término"
          value={fechaTerminoEstimada}
          onChangeText={(text) => handleInputChange('fechaTerminoEstimada', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="list-alt" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Descripción de la mantención"
          value={descripcion}
          onChangeText={(text) => handleInputChange('descripcion', text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="dollar" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Costo estimado"
          value={costoEstimado}
          onChangeText={(text) => handleInputChange('costoEstimado', text)}
          keyboardType="numeric"
        />
      </View>
      <Button title="Guardar Mantención" onPress={() => console.log('Guardar')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    height: 40,
    width: '80%',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  icon: {
    marginRight: 10,
  },
});

export default AgrergarMantencion;
