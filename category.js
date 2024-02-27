//Objeto Category
class Category {
  constructor(name, description, imagen) {
    this.name = name;
    this.description = description;
    this.imagen = imagen;
  }

  // Métodos Getter y Setter
  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
  getImagen() {
    return this.imagen;
  }

  setImagen(imagen) {
    this.imagen = imagen;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  // Método toString()
  toString() {
    return `\nCategory Name: ${this.name}\nDescription: ${this.description}`;
  }
}
export { Category };
