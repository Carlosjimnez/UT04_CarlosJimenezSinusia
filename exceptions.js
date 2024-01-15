class CategoryAlreadyExistsError extends Error {
  constructor(message) {
    super(message || "La categoría ya existe.");
    this.name = "CategoryAlreadyExistsError";
  }
}

class CategoryNotFoundError extends Error {
  constructor(message) {
    super(message || "La categoría no está registrada.");
    this.name = "CategoryNotFoundError";
  }
}

class MenuAlreadyExistsError extends Error {
  constructor(message) {
    super(message || "El menú ya existe.");
    this.name = "MenuAlreadyExistsError";
  }
}

class MenuNotFoundError extends Error {
  constructor(message) {
    super(message || "El menú no está registrado.");
    this.name = "MenuNotFoundError";
  }
}

class AllergenAlreadyExistsError extends Error {
  constructor(message) {
    super(message || "El alérgeno ya existe.");
    this.name = "AllergenAlreadyExistsError";
  }
}

class AllergenNotFoundError extends Error {
  constructor(message) {
    super(message || "El alérgeno no está registrado.");
    this.name = "AllergenNotFoundError";
  }
}

class DishAlreadyExistsError extends Error {
  constructor(message) {
    super(message || "El plato ya existe.");
    this.name = "DishAlreadyExistsError";
  }
}

class DishNotFoundError extends Error {
  constructor(message) {
    super(message || "El plato no está registrado.");
    this.name = "DishNotFoundError";
  }
}

class RestaurantAlreadyExistsError extends Error {
  constructor(message) {
    super(message || "El restaurante ya existe.");
    this.name = "RestaurantAlreadyExistsError";
  }
}

class RestaurantNotFoundError extends Error {
  constructor(message) {
    super(message || "El restaurante no está registrado.");
    this.name = "RestaurantNotFoundError";
  }
}

class InvalidObjectError extends Error {
  constructor(message) {
    super(message || "El objeto proporcionado es inválido.");
    this.name = "InvalidObjectError";
  }
}

export {
  CategoryAlreadyExistsError,
  CategoryNotFoundError,
  MenuAlreadyExistsError,
  MenuNotFoundError,
  AllergenAlreadyExistsError,
  AllergenNotFoundError,
  DishAlreadyExistsError,
  DishNotFoundError,
  RestaurantAlreadyExistsError,
  RestaurantNotFoundError,
  InvalidObjectError,
};
