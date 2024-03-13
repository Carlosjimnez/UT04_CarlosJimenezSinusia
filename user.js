// Importar excepciones personalizadas desde el archivo de excepciones
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./exceptions.js";

// Definir la clase User
class User {
  // Campos privados de la clase User
  #username; // Nombre de usuario
  #preferences; // Preferencias del usuario

  // Constructor de la clase User
  constructor(username) {
    // Verificar si el constructor se llama con 'new'
    if (!new.target) throw new InvalidAccessConstructorException();
    // Verificar si se proporciona un nombre de usuario válido
    if (!username) throw new EmptyValueException("username");

    // Inicializar el campo privado #username con el nombre de usuario proporcionado
    this.#username = username;

    // Definir el getter para el campo username para que sea enumerable
    Object.defineProperty(this, "username", {
      enumerable: true,
      get() {
        return this.#username; // Devuelve el nombre de usuario
      },
    });

    // Definir el getter y setter para el campo preferences para que sea enumerable
    Object.defineProperty(this, "preferences", {
      enumerable: true,
      get() {
        return this.#preferences; // Devuelve las preferencias del usuario
      },
      set(value) {
        // Verificar si se proporciona un valor válido para las preferencias
        if (!value) throw new EmptyValueException("preferences");
        this.#preferences = value; // Establecer las preferencias del usuario
      },
    });
  }
}

// Exportar la clase User para que esté disponible fuera del módulo actual
export { User };
