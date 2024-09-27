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

  const { tareas } = route.params; // Recibimos todas las tareas desde la pantalla anterior

  return (
    <ScrollView style={DatosEscaneadosStyles.container}>
      {tareas.map((mantencionData, index) => (
        <Card key={index} style={DatosEscaneadosStyles.card}>
          <Card.Content>
            <Title style={DatosEscaneadosStyles.title}>Datos Escaneados {index + 1}</Title>
            <Paragraph
              style={DatosEscaneadosStyles.dataItem}
            >{`Descripción: ${mantencionData.descripcion || "Descripción no disponible"}`}</Paragraph>
            <Paragraph
              style={DatosEscaneadosStyles.dataItem}
            >{`Estado: ${translateEstado(mantencionData.estado || "Estado no disponible")}`}</Paragraph>
            <Paragraph
              style={DatosEscaneadosStyles.dataItem}
            >{`Fecha: ${formatDate(new Date(mantencionData.fecha))}`}</Paragraph>
            <Paragraph
              style={DatosEscaneadosStyles.dataItem}
            >{`Kilometraje: ${formatoKilometraje(
              mantencionData.kilometrajeMantencion || "Kilometraje no disponible"
            )}`}</Paragraph>
            <Paragraph
              style={DatosEscaneadosStyles.dataItem}
            >{`Tipo de Mantención: ${mantencionData.tipoMantencion || "Tipo de Mantención no disponible"}`}</Paragraph>
          </Card.Content>
          {mantencionData.productos && mantencionData.productos.length > 0 && (
            <Card style={DatosEscaneadosStyles.productContainer}>
              <Card.Content>
                <Title style={DatosEscaneadosStyles.productTitle}>Productos:</Title>
                {mantencionData.productos.map((producto, i) => (
                  <Paragraph
                    style={DatosEscaneadosStyles.productItem}
                    key={i}
                  >{`- ${producto.nombreProducto}`}</Paragraph>
                ))}
              </Card.Content>
            </Card>
          )}
        </Card>
      ))}
    </ScrollView>
  );
}
