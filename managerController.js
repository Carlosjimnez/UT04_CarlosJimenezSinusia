import {
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
} from "./exceptions.js";

import Allergen from "./scriptRestaurantManager.js";
import Menu from "./scriptRestaurantManager.js";
import Dish from "./scriptRestaurantManager.js";
import Restaurant from "./scriptRestaurantManager.js";
import Category from "./scriptRestaurantManager.js";
import { Coordinate } from "./coordinate.js";
const MODEL = Symbol("managerModel");
const VIEW = Symbol("managerView");
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");

class ManagerController {
  constructor(model, view) {
    this[MODEL] = model;
    this[VIEW] = view;

    this.onLoad();
    this.onInit();
    this[VIEW].bindInit(this.handleInit);
  }

  [LOAD_MANAGER_OBJECTS]() {
    const category1 = this[MODEL].createCategory("Primeros");
    const category2 = this[MODEL].createCategory("Segundos");
    const category3 = this[MODEL].createCategory("Postres");

    category1.description = "Platos Frios";
    category2.description = "Platos Calientes";
    category3.description = "Platos Dulces y Salados";

    category1.imagen = "imagen/ensaColiflor.jpg";
    category2.imagen = "imagen/carne.jpg";
    category3.imagen = "imagen/brazo.jpg";

    this[MODEL].addCategory(category1, category2, category3);

    let primero1 = this[MODEL].createDish("Ensaladilla de Coliflor");
    let primero2 = this[MODEL].createDish("Ensaladilla Pulpo");
    let primero3 = this[MODEL].createDish("Ensalada de Arroz");
    let primero4 = this[MODEL].createDish("Ensalada de Pasta al Pesto");
    let segundo1 = this[MODEL].createDish("Paletilla de Cabrito");
    let segundo2 = this[MODEL].createDish("Tartar de Salmon");
    let segundo3 = this[MODEL].createDish("Makis de Atun");
    let segundo4 = this[MODEL].createDish("Lomo de Cerdo");
    let postre1 = this[MODEL].createDish("Tarta de Queso");
    let postre2 = this[MODEL].createDish("Tarta 3 Chocolates");
    let postre3 = this[MODEL].createDish("Coulants de Chocolate");
    let postre4 = this[MODEL].createDish("Brazo de Gitano");

    primero1.description =
      "Plato sencillo y fresco que se prepara con ingredientes caseros y que te va a encantar si eres amante de la verdura";
    primero2.description = "Ensaladilla de pulpo con un toque ‘a la gallega’";
    primero3.description =
      "Ensalada de arroz y verduritas se puede preparar con verduras de temporada, un plato fresco y sencillo";
    primero4.description =
      "Esta ensalada de patatas al pesto es fresca y natural. El pesto casero tiene más frescura y sabor.";
    segundo1.description =
      "Esta receta es la mezcla perfecta entre modernidad y clasicismo, ¡atrévete!";
    segundo2.description =
      "Necesitas que un plato sea caliente para que sea espectacular como este tartar";
    segundo3.description =
      "Una receta sencilla, deliciosa y fresca. Perfecta para los amantes del sushi que quieren iniciarse en su cocinado";
    segundo4.description =
      "Lomo de cerdo en escabeche de especias, receta ideal para el verano";
    postre1.description =
      "La tarta de queso es uno de los postres que más alegrías nos dan";
    postre2.description = "Con un trozo de esta tendras suficiente";
    postre3.description =
      "El contraste del frio y calor está presente en este postre";
    postre4.description = "Este brazo si que se puede comer";

    primero1.ingredients = [
      "coliflor",
      "atun",
      "huevo duro",
      "mayonesa",
      "cebolla fresca",
    ];
    primero2.ingredients = [
      "pulpo",
      "mayonesa",
      "pimiento rojo",
      "cebolla",
      "patatas",
    ];
    primero3.ingredients = [
      "arroz",
      "verduras variadas",
      "ajo",
      "zumo de lima",
    ];
    primero4.ingredients = [
      "albahaca fresca",
      "ajo",
      "queso parmesano",
      "piñones",
      "sal y pimienta",
    ];
    segundo1.ingredients = [
      "cabrito",
      "sal y pimienta",
      "caldo de cocido",
      "mantequilla",
    ];
    segundo2.ingredients = [
      "salmon",
      "rabanitos",
      "lima",
      "kimchi",
      "cebolleta",
    ];
    segundo3.ingredients = [
      "atun fresco",
      "cebolleta",
      "soja",
      "arroz",
      "aguacate",
      "jengibre",
    ];
    segundo4.ingredients = ["lomo", "ajo", "vinagre", "anis", "canela"];
    postre1.ingredients = ["huevos", "queso", "vainila", "harina"];
    postre2.ingredients = ["galleta", "chocolate tres tipos", "leche"];
    postre3.ingredients = [
      "huevos",
      "chocolate negro",
      "mantequilla",
      "azucar",
      "almendras",
      "helado",
    ];
    postre4.ingredients = [
      "huevos",
      "harina",
      "azucar",
      "dulce de leche",
      "azucar glas",
      "mantequilla",
    ];

    primero1.image = "imagen/ensaColiflor.jpg";
    primero2.image = "imagen/ensaPulpo.jpg";
    primero3.image = "imagen/ensaArroz.jpg";
    primero4.image = "imagen/ensaPasta.jpg";
    segundo1.image = "imagen/paletillaCabri.jpg";
    segundo2.image = "imagen/tartarSalmon.jpg";
    segundo3.image = "imagen/makis.jpg";
    segundo4.image = "imagen/lomo.jpg";
    postre1.image = "imagen/tartaQueso.jpg";
    postre2.image = "imagen/tartaChoco.jpg";
    postre3.image = "imagen/coulant.jpg";
    postre4.image = "imagen/brazo.jpg";

    this[MODEL].addDish(
      primero1,
      primero2,
      primero3,
      primero4,
      segundo1,
      segundo2,
      segundo3,
      segundo4,
      postre1,
      postre2,
      postre3,
      postre4
    );

    let allergen1 = this[MODEL].createAllergen("Pimiento");
    let allergen2 = this[MODEL].createAllergen("Frutos");
    let allergen3 = this[MODEL].createAllergen("Lacteos");
    let allergen4 = this[MODEL].createAllergen("Pescado");

    this[MODEL].addAllergen(allergen1, allergen2, allergen3, allergen4);

    let menu1 = this[MODEL].createMenu("Menú Infinito");
    let menu2 = this[MODEL].createMenu("Menú Especial");
    let menu3 = this[MODEL].createMenu("Menú Estrella");

    menu1.description = "La Mejor combinación de estos platos";
    menu2.description = "Lo que nunca falla";
    menu3.description = "O hoy o nunca";

    this[MODEL].addMenu(menu1, menu2, menu3);

    // Creamos nuestros restaurantes
    let restLioko = this[MODEL].createRestaurant("Lioko");
    let restCogido = this[MODEL].createRestaurant("Codigo II");
    let restAntigua = this[MODEL].createRestaurant("La Antigua");

    restLioko.image = "imagen/restaurante1.jpg";
    restCogido.image = "imagen/restaurante3.jpg";
    restAntigua.image = "imagen/restaurante4.jpg";

    restLioko.description = "Los mejores platos tradicionales";
    restCogido.description = "Preparate para lo mas innovador";
    restAntigua.description = "Restaurante 3 Estrellas Michelin ";

    restLioko.location = new Coordinate("-0.1257400", "51.5085300");
    restCogido.location = new Coordinate("41.38879", " 2.15899");
    restAntigua.location = new Coordinate("2.3486000", "48.8534000");

    this[MODEL].addRestaurant(restLioko, restCogido, restAntigua);

    this[MODEL].assignCategoryToDish(primero1, category1);
    this[MODEL].assignCategoryToDish(primero2, category1);
    this[MODEL].assignCategoryToDish(primero3, category1);
    this[MODEL].assignCategoryToDish(primero4, category1);
    this[MODEL].assignCategoryToDish(segundo1, category2);
    this[MODEL].assignCategoryToDish(segundo2, category2);
    this[MODEL].assignCategoryToDish(segundo3, category2);
    this[MODEL].assignCategoryToDish(segundo4, category2);
    this[MODEL].assignCategoryToDish(postre1, category3);
    this[MODEL].assignCategoryToDish(postre2, category3);
    this[MODEL].assignCategoryToDish(postre3, category3);
    this[MODEL].assignCategoryToDish(postre4, category3);

    this[MODEL].assignDishToMenu(menu1, primero1, segundo1, postre1);
    this[MODEL].assignDishToMenu(menu2, primero2, segundo2, postre2);
    this[MODEL].assignDishToMenu(menu3, primero3, segundo3, postre3);

    this[MODEL].assignAllergenToDish(primero2, allergen1);
    this[MODEL].assignAllergenToDish(segundo2, allergen1, allergen4);
    this[MODEL].assignAllergenToDish(segundo3, allergen4);
    this[MODEL].assignAllergenToDish(postre3, allergen2, allergen3);
    this[MODEL].assignAllergenToDish(postre1, allergen3);
    this[MODEL].assignAllergenToDish(postre2, allergen3);
    this[MODEL].assignAllergenToDish(postre4, allergen3);
  }
  // Con onLoad cargarmos la aplicacion
  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
    // Agrega las categorías al menú desplegable y asi con todos
    this.onAddCategory();
    this.onAddAllergen();
    this.onAddMenu();
    this.onAddRestaurant();

    console.log(this[MODEL]);
  };

  // Con estos metodos se manejan acciones relacionadas con la adición de categorías, menus, alergenos y restaurantes
  // Maneja la adición de una nueva categoría
  onAddCategory = () => {
    this[VIEW].showCategoriesInMenu(this[MODEL].getCategories());
    this[VIEW].bindCategorysListInMenu(this.handleCategoryList);
  };
  // Maneja la adición de un nuevo alérgeno
  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].getAllergens());
    this[VIEW].bindAllergenList(this.handleAllergenList);
  };
  // Maneja la adición de un nuevo menú
  onAddMenu = () => {
    this[VIEW].showMenusInMenu(this[MODEL].getMenus());
    this[VIEW].bindMenuList(this.handleMenuList);
  };
  // Maneja la adición de un nuevo restaurante
  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].getRestaurants());
    this[VIEW].bindRestaurant(this.handleShowRestaurant);
  };
  // Maneja la inicialización de la aplicación
  onInit = () => {
    this[VIEW].showCategories(this[MODEL].getCategories());
    this[VIEW].bindCategoryList(this.handleCategoryList);
    this[VIEW].showRandomDishes(this[MODEL].getRandomDishes());
    this[VIEW].bindRandomDishes(this.handleRandomList);
  };
  // Maneja la inicialización de la aplicación
  handleInit = () => {
    this.onInit();
  };

  //Manejadores para mostrar la visualizacion de los platos e una categoria especifica
  // Maneja la generación de un plato aleatorio y su visualización
  handleRandomList = (name) => {
    const dish = this[MODEL].createDish(name);
    this.handleShowDish(dish.name);
  };
  // Maneja la visualización de platos en una categoría
  handleCategoryList = (name) => {
    const category = this[MODEL].createCategory(name);
    this[VIEW].listDishes(
      this[MODEL].getDishesInCategory(category),
      category.name
    );
    this[VIEW].bindShowDish();
  };
  // Maneja la visualización de platos con un alérgeno
  handleAllergenList = (name) => {
    const allergen = this[MODEL].createAllergen(name);
    this[VIEW].listDishes(
      this[MODEL].getDishesWithAllergen(allergen),
      allergen.name
    );
    this[VIEW].bindShowDish();
  };
  // Maneja la visualización de platos en un menú
  handleMenuList = (name) => {
    const menu = this[MODEL].createMenu(name);
    this[VIEW].listDishes(this[MODEL].getDishWithMenu(menu), menu.name);
    this[VIEW].bindShowDish();
  };
  // Maneja la visualización de detalles de un restaurante
  handleShowRestaurant = (name) => {
    const restaurant = this[MODEL].createRestaurant(name);
    this[VIEW].showRestaurant(restaurant);
  };
}

export default ManagerController;
