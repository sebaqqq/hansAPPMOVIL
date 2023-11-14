import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DatosEscaneadosScreen({ route }) {
  const { mantencionData } = route.params;

  // Agregar un log de depuración para verificar la estructura de mantencionData
  console.log('mantencionData:', mantencionData);

  // Verificar si las propiedades están presentes y asignar valores predeterminados si no
  const descripcion = mantencionData?.descripcion || 'Descripción no disponible';
  const estado = mantencionData?.estado || 'Estado no disponible';
  const fecha = mantencionData?.fecha || 'Fecha no disponible';
  const kilometrajeMantencion = mantencionData?.kilometrajeMantencion || 'Kilometraje no disponible';
  const tipoMantencion = mantencionData?.tipoMantencion || 'Tipo de Mantención no disponible';
  const productos = mantencionData?.productos || [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Datos Escaneados</Text>
      <Text>{`Descripción: ${descripcion}`}</Text>
      <Text>{`Estado: ${estado}`}</Text>
      <Text>{`Fecha: ${fecha}`}</Text>
      <Text>{`Kilometraje de Mantención: ${kilometrajeMantencion}`}</Text>
      <Text>{`Tipo de Mantención: ${tipoMantencion}`}</Text>
      
      {/* Mostrar productos si están presentes */}
      {productos.length > 0 && (
        <View>
          <Text>Productos:</Text>
          {productos.map((producto, index) => (
            <Text key={index}>{`- ${producto.nombreProducto}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});