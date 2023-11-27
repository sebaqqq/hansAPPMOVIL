// Componente DatosEscaneadosScreen:
// Este componente React Native sirve como la pantalla para mostrar los datos escaneados de una mantención.
// Características Principales:
// - Utiliza la ruta (`route.params.mantencionData`) para obtener los datos de la mantención escaneada.
// - Muestra la descripción, estado, fecha, kilometraje, tipo de mantención y productos asociados, si están presentes.
// - Utiliza estilos de diseño para una apariencia atractiva y fácil de leer.

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
      <Text style={styles.title}>Datos Escaneados</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.dataItem}>{`Descripción: ${descripcion}`}</Text>
        <Text style={styles.dataItem}>{`Estado: ${estado}`}</Text>
        <Text style={styles.dataItem}>{`Fecha: ${fecha}`}</Text>
        <Text style={styles.dataItem}>{`Kilometraje de Mantención: ${kilometrajeMantencion}`}</Text>
        <Text style={styles.dataItem}>{`Tipo de Mantención: ${tipoMantencion}`}</Text>
      </View>
      
      {/* Mostrar productos si están presentes */}
      {productos.length > 0 && (
        <View style={styles.productContainer}>
          <Text style={styles.productTitle}>Productos:</Text>
          {productos.map((producto, index) => (
            <Text style={styles.productItem} key={index}>{`- ${producto.nombreProducto}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  productContainer: {
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    fontSize: 16,
  },
});