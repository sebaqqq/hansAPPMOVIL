
export default class ValidadorVIN {
  constructor(vin) {
    this.vin = vin.toUpperCase().trim();
  }

  calcularDigitoControlVIN() {
    const mapaValores = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4,
      N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9, 1: 1,
      2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
    };

    const pesos = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

    let suma = 0;
    for (let i = 0; i < this.vin.length; i++) {
      const caracter = this.vin[i];
      suma += (mapaValores[caracter] || 0) * pesos[i];
    }

    const resto = suma % 11;
    return resto === 10 ? 'X' : resto.toString();
  }

  validarVIN() {
    if (this.vin.length !== 17) {
      return { esValido: false, mensajeError: "El número de chasis debe tener 17 caracteres." };
    }

    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!vinRegex.test(this.vin)) {
      return { esValido: false, mensajeError: "El número de chasis contiene caracteres inválidos." };
    }

    const digitoControlCalculado = this.calcularDigitoControlVIN();
    if (this.vin[8] !== digitoControlCalculado) {
      return { esValido: false, mensajeError: `Dígito de control inválido. Debería ser: ${digitoControlCalculado}.` };
    }

    return { esValido: true, mensajeError: "" };
  }
}
