// Objeto Coordinate para representar las coordenadas
class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  // Métodos Getter y Setter
  getLatitude() {
    return this.latitude;
  }

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }

  // Método toString()
  toString() {
    return `(${this.latitude}, ${this.longitude})`;
  }
}

export { Coordinate };
