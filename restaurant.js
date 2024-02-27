import { Coordinate } from "./coordinate.js";

class Restaurant {
  constructor(name, description, location, image) {
    this.name = name;
    this.description = description;
    this.location = new Coordinate();
    this.image = image;
  }

  // Métodos Getter y Setter
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }
  getImage() {
    return this.image;
  }

  setImage(image) {
    this.image = image;
  }

  // Método toString()
  toString() {
    return `Restaurant Name: ${this.name}\nDescription: ${
      this.description
    }\nLocation: ${this.location.toString()}`;
  }
}
export { Restaurant };
