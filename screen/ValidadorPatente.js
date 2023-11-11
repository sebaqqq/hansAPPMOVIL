class ValidadorPatenteAutomovil {
  validarPatente(patente) {
    // Expresión regular para validar patentes chilenas
    const patronPatente = /^[A-Z]{2}\d{4}$/;
    return patronPatente.test(patente);
  }
}

export default ValidadorPatenteAutomovil;