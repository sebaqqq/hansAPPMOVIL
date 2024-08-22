class ValidadorPatente {
    constructor(patente) {
      this.patente = patente.toUpperCase().replace(/[^A-Z0-9]/g, "");
      this.esValido = this.validar();
    }
  
    validar() {
      const regex = /^[A-Z]{4}\d{2}$/;
      return regex.test(this.patente);
    }
  
    formateado() {
      if (!this.esValido) return "";
      return this.patente;
    }
  }
  
  export default ValidadorPatente;
  