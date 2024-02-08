import React from 'react';
import { View, Text } from 'react-native';
import { DatosEscaneadosStyles } from '../styles/DatosEscaneadosEstilo';

export default function DatosEscaneadosScreen({ route }) {
  const { mantencionData } = route.params;
  const descripcion = mantencionData?.descripcion || 'Descripción no disponible';
  const estado = mantencionData?.estado || 'Estado no disponible';
  const fecha = mantencionData?.fecha || 'Fecha no disponible';
  const kilometrajeMantencion = mantencionData?.kilometrajeMantencion || 'Kilometraje no disponible';
  const tipoMantencion = mantencionData?.tipoMantencion || 'Tipo de Mantención no disponible';
  const productos = mantencionData?.productos || [];

  return (
    <View style={DatosEscaneadosStyles.container}>
      <Text style={DatosEscaneadosStyles.title}>Datos Escaneados</Text>
      <View style={DatosEscaneadosStyles.dataContainer}>
        <Text style={DatosEscaneadosStyles.dataItem}>{`Descripción: ${descripcion}`}</Text>
        <Text style={DatosEscaneadosStyles.dataItem}>{`Estado: ${estado}`}</Text>
        <Text style={DatosEscaneadosStyles.dataItem}>{`Fecha: ${fecha}`}</Text>
        <Text style={DatosEscaneadosStyles.dataItem}>{`Kilometraje de Mantención: ${kilometrajeMantencion}`}</Text>
        <Text style={DatosEscaneadosStyles.dataItem}>{`Tipo de Mantención: ${tipoMantencion}`}</Text>
      </View>
      {productos.length > 0 && (
        <View style={DatosEscaneadosStyles.productContainer}>
          <Text style={DatosEscaneadosStyles.productTitle}>Productos:</Text>
          {productos.map((producto, index) => (
            <Text style={DatosEscaneadosStyles.productItem} key={index}>{`- ${producto.nombreProducto}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}