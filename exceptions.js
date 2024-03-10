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
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}

// Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Constructor can’t be called as a function.", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

// Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super(
      `Error: The parameter ${param} can't be empty.`,
      fileName,
      lineNumber
    );
    this.param = param;
    this.name = "EmptyValueException";
  }
}

// Excepción de valor inválido
class InvalidValueException extends BaseException {
  constructor(param, value, fileName, lineNumber) {
    super(
      `Error: The paramenter ${param} has an invalid value. (${param}: ${value})`,
      fileName,
      lineNumber
    );
    this.param = param;
    this.name = "EmptyValueException";
  }
}

// Excepción personalizada para clases abstractas.
class AbstractClassException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: The class  ${className} is abstract.`, fileName, lineNumber);
    this.className = className;
    this.name = "AbstractClassException";
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
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
};
