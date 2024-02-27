import { ManagerAplication } from "./managerAplication.js";
const historyActions = {
  // Inicialización de la aplicación
  init: () => {
    ManagerAplication.handleInit();
  },
  // Acción para mostrar un plato aleatorio
  dishRandom: (event) => {
    ManagerAplication.handleRandomList(event.state.dish);
  },
  // Acción para mostrar una lista de categorías
  categoryList: (event) => {
    ManagerAplication.handleCategoryList(event.state.category);
  },
  // Acción para mostrar una lista de alérgenos
  allergenList: (event) => {
    ManagerAplication.handleAllergenList(event.state.allergen);
  },
  // Acción para mostrar una lista de menús
  menuList: (event) => {
    ManagerAplication.handleMenuList(event.state.menu);
  },
  // Acción para mostrar un restaurante
  restaurantList: (event) => {
    ManagerAplication.handleShowRestaurant(event.state.restaurant);
  },
  // Acción para mostrar detalles de un plato
  showDish: (event) => {
    ManagerAplication.handleShowDish(event.state.dish);
  },
};

// Event listener para el evento popstate, que se dispara cuando cambia el historial de navegación
window.addEventListener("popstate", (event) => {
  // Verifica si hay un estado asociado al evento
  if (event.state) {
    // Ejecuta la acción correspondiente según el estado actual del historial
    historyActions[event.state.action](event);
  }
});

// Reemplazamos el estado actual del historial con un objeto que contiene la acción "init"
history.replaceState({ action: "init" }, null);
