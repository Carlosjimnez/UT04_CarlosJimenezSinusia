class Dish {
  constructor(name, description, ingredients, image) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
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

  getIngredients() {
    return this.ingredients;
  }

  setIngredients(ingredients) {
    this.ingredients = ingredients;
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    this.image = image;
  }

  // Método toString()
  toString() {
    return `\nDish Name: ${this.name}\nDescription: ${this.description}\nIngredients: ${this.ingredients}\nImage: ${this.image}`;
  }
}

export { Dish };
