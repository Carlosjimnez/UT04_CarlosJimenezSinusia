// Importar el módulo RestaurantsManager desde el archivo scriptRestaurantManager.js
import RestaurantsManager from "./scriptRestaurantManager.js";

// Importar el módulo ManagerController desde el archivo managerController.js
import ManagerController from "./managerController.js";

// Importar el módulo ManagerView desde el archivo managerView.js
import ManagerView from "./managerView.js";

// Importar el módulo AuthenticationService desde el archivo authentication.js
import AuthenticationService from "./authentication.js";

// Crear una instancia de ManagerController que representa la aplicación del manager
const ManagerAplication = new ManagerController(
  // Pasar una instancia única de RestaurantsManager como primer parámetro
  RestaurantsManager.getInstance(),
  // Pasar una nueva instancia de ManagerView como segundo parámetro
  new ManagerView(),
  // Pasar una instancia única de AuthenticationService como tercer parámetro
  AuthenticationService.getInstance()
);

// Exportar la instancia de ManagerAplication para que esté disponible fuera de este módulo
export { ManagerAplication };
