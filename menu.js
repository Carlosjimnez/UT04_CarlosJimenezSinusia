// Objeto Menu
class Menu {
  constructor(name, description) {
    this.name = name;
    this.description = description;
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

  // Método toString()
  toString() {
    return `Menu Name: ${this.name}\nDescription: ${this.description}`;
  }
}
export { Menu };
