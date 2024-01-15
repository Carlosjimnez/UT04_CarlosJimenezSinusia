// Objeto Allergen
class Allergen {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  º;
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
    return `\nAllergen Name: ${this.name}\nDescription: ${this.description}`;
  }
}
export { Allergen };
