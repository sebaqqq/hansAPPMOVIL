import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function AgrergarMantencion() {
  const [patente, setPatente] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTerminoEstimada, setFechaTerminoEstimada] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costoEstimado, setCostoEstimado] = useState('');

  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para enviar los datos a tu backend o realizar alguna acción con la información ingresada.
    console.log('Datos ingresados:', { patente, fechaInicio, fechaTerminoEstimada, descripcion, costoEstimado });
    // Puedes agregar lógica adicional según tus necesidades, como enviar los datos a una API, guardar en una base de datos, etc.
  };

  return (
    <View style={styles.container}>
      <Text>Ingrese los datos de la mantención:</Text>
      <TextInput
        style={styles.input}
        placeholder="Patente del auto"
        onChangeText={text => setPatente(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha de inicio"
        onChangeText={text => setFechaInicio(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha estimada de término"
        onChangeText={text => setFechaTerminoEstimada(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la mantención"
        onChangeText={text => setDescripcion(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Costo estimado"
        onChangeText={text => setCostoEstimado(text)}
        keyboardType="numeric"
      />
      <Button title="Guardar Mantención" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '100%',
  },
});

export default AgrergarMantencion;
