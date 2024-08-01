import React from "react";
import { ScrollView } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
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
    <ScrollView style={DatosEscaneadosStyles.container}>
      <Card>
        <Card.Content>
          <Title style={DatosEscaneadosStyles.title}>Datos Escaneados</Title>
          <Paragraph
            style={DatosEscaneadosStyles.dataItem}
          >{`Descripción: ${descripcion}`}</Paragraph>
          <Paragraph
            style={DatosEscaneadosStyles.dataItem}
          >{`Estado: ${translateEstado(estado)}`}</Paragraph>
          <Paragraph
            style={DatosEscaneadosStyles.dataItem}
          >{`Fecha: ${formatDate(new Date(fecha))}`}</Paragraph>
          <Paragraph
            style={DatosEscaneadosStyles.dataItem}
          >{`Kilometro de Mantención: ${formatoKilometraje(
            kilometrajeMantencion
          )}`}</Paragraph>
          <Paragraph
            style={DatosEscaneadosStyles.dataItem}
          >{`Tipo de Mantención: ${tipoMantencion}`}</Paragraph>
        </Card.Content>
      </Card>
      {productos.length > 0 && (
        <Card style={DatosEscaneadosStyles.productContainer}>
          <Card.Content>
            <Title style={DatosEscaneadosStyles.productTitle}>Productos:</Title>
            {productos.map((producto, index) => (
              <Paragraph
                style={DatosEscaneadosStyles.productItem}
                key={index}
              >{`- ${producto.nombreProducto}`}</Paragraph>
            ))}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}
