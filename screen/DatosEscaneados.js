import React from "react";
import { View, Text } from "react-native";
import { DatosEscaneadosStyles } from "../styles/DatosEscaneadosEstilo";

export default function DatosEscaneadosScreen({ route }) {
  const translateEstado = (estado) => {
    switch (estado) {
      case "atencion_especial":
        return "Atención Especial";
      case "pendiente":
        return "Pendiente";
      case "prioridad":
        return "Prioridad";
      case "en proceso":
        return "En Proceso";
      case "terminado":
        return "Terminado";
      default:
        return estado;
    }
  };

  const formatoKilometraje = (amount) => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  const { mantencionData } = route.params;
  const descripcion =
    mantencionData?.descripcion || "Descripción no disponible";
  const estado = mantencionData?.estado || "Estado no disponible";
  const fecha = mantencionData?.fecha || "Fecha no disponible";
  const kilometrajeMantencion =
    mantencionData?.kilometrajeMantencion || "Kilometraje no disponible";
  const tipoMantencion =
    mantencionData?.tipoMantencion || "Tipo de Mantención no disponible";
  const productos = mantencionData?.productos || [];

  return (
    <View style={DatosEscaneadosStyles.container}>
      <Text style={DatosEscaneadosStyles.title}>Datos Escaneados</Text>
      <View style={DatosEscaneadosStyles.dataContainer}>
        <Text
          style={DatosEscaneadosStyles.dataItem}
        >{`Descripción: ${descripcion}`}</Text>
        <Text
          style={DatosEscaneadosStyles.dataItem}
        >{`Estado: ${translateEstado(estado)}`}</Text>
        <Text style={DatosEscaneadosStyles.dataItem}>{`Fecha: ${formatDate(
          new Date(fecha)
        )}`}</Text>
        <Text
          style={DatosEscaneadosStyles.dataItem}
        >{`Kilometraje de Mantención: ${formatoKilometraje(
          kilometrajeMantencion
        )}`}</Text>
        <Text
          style={DatosEscaneadosStyles.dataItem}
        >{`Tipo de Mantención: ${tipoMantencion}`}</Text>
      </View>
      {productos.length > 0 && (
        <View style={DatosEscaneadosStyles.productContainer}>
          <Text style={DatosEscaneadosStyles.productTitle}>Productos:</Text>
          {productos.map((producto, index) => (
            <Text
              style={DatosEscaneadosStyles.productItem}
              key={index}
            >{`- ${producto.nombreProducto}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
