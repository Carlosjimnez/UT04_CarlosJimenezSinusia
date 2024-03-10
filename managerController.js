import { getCookie } from "./utils.js";
import Allergen from "./scriptRestaurantManager.js";
import Menu from "./scriptRestaurantManager.js";
import Dish from "./scriptRestaurantManager.js";
import Restaurant from "./scriptRestaurantManager.js";
import Category from "./scriptRestaurantManager.js";
import { Coordinate } from "./coordinate.js";
import { ManagerAplication } from "./managerAplication.js";

const MODEL = Symbol("managerModel");
const VIEW = Symbol("managerView");
const LOAD_MANAGER_OBJECTS = Symbol("Load Manager Objects");
const AUTH = Symbol("AUTH");
const USER = Symbol("USER");

class ManagerController {
  constructor(model, view, auth) {
    this[MODEL] = model;
    this[VIEW] = view;
    this[AUTH] = auth;
    this[USER] = null;

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
  // Con onLoad cargarmos los metodos
  onLoad = () => {
    this[LOAD_MANAGER_OBJECTS]();
    this.onAddCategory();
    this.onAddAllergen();
    this.onAddMenu();
    this.onAddRestaurant();
    this.onCloseFileWindow();
    if (getCookie("accetedCookieMessage") !== "true") {
      this[VIEW].showCookiesMessage();
    }
    const userCookie = getCookie("activeUser");
    if (userCookie) {
      const user = this[AUTH].getUser(userCookie);
      if (user) {
        this[USER] = user;
        this.onOpenSession();
      }
    } else {
      this.onCloseSession();
    }
  };

  // Con estos metodos se manejan acciones relacionadas con la adición de categorías, menus, alergenos y restaurantes
  // Método para agregar categorías al menú
  onAddCategory = () => {
    // Mostramos las categorías en el menú utilizando la vista y obtener la lista de categorías del modelo
    this[VIEW].showCategoriesInMenu(this[MODEL].getCategories());
    // Vinculamos la lista de categorías del menú con el manejador de categorías
    this[VIEW].bindCategorysListInMenu(this.handleCategoryList);
  };
  // Método para agregar alérgenos al menú
  onAddAllergen = () => {
    this[VIEW].showAllergensInMenu(this[MODEL].getAllergens());
    this[VIEW].bindAllergenList(this.handleAllergenList);
  };
  // Método para agregar menús al menú
  onAddMenu = () => {
    this[VIEW].showMenusInMenu(this[MODEL].getMenus());
    this[VIEW].bindMenuList(this.handleMenuList);
  };
  // Método para agregar restaurantes al menú
  onAddRestaurant = () => {
    this[VIEW].showRestaurantsInMenu(this[MODEL].getRestaurants());
    this[VIEW].bindRestaurant(this.handleShowRestaurant);
  };
  // Método para cerrar la ventana de ficha de plato
  onCloseFileWindow = () => {
    // Mostramos el enlace para cerrar ventanas de fichas utilizando la vista
    this[VIEW].showCloseFilesWindow();
    //Evento para cerrar ventanas de fichas
    this[VIEW].bindShowCloseFilesWindow(this.handleCloseFileWindow);
  };

  onOpenSession() {
    this.onInit();
    this[VIEW].initHistory();
    this[VIEW].showAuthUserProfile(this[USER]);
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this[VIEW].showAdminMenu();
    this[VIEW].bindAdminMenu(
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleModifyMenu,
      this.handleModifyMenuDesasig,
      this.handleNewRestaurantForm,
      this.handleAssingCategory,
      this.handleDesasigCategory
    );
  }

  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeAdminMenu();
  }

  // Inicialización de la aplicación
  onInit = () => {
    this[VIEW].showCategories(this[MODEL].getCategories());
    this[VIEW].bindCategoryList(this.handleCategoryList);
    this[VIEW].showRandomDishes(this[MODEL].getRandomDishes());
    this[VIEW].bindRandomDishes(this.handleRandomList);
  };
  //Manejar la inicialización de la aplicación
  handleInit = () => {
    this.onInit();
  };

  //Manejadores para mostrar la visualizacion de los platos e unacategori especifica
  // Método para mostrar los detalles de un plato
  handleShowDish = (name) => {
    this[VIEW].showDish(name, this.handleShowFileDish);
  };
  // Método para manejar la lista de platos aleatorios
  handleRandomList = (name) => {
    const dish = this[MODEL].createDish(name);
    this.handleShowDish(dish.name);
  };
  // Método para manejar la lista de categorías
  handleCategoryList = (name) => {
    console.log(name);
    const category = this[MODEL].createCategory(name);
    console.log(category);

    this[VIEW].listDishes(
      this[MODEL].getDishesInCategory(category),
      category.name
    );

    this[VIEW].bindShowDish(this.handleShowDish);
    console.log("hola");
  };
  // Método para manejar la lista de alérgenos
  handleAllergenList = (name) => {
    const allergen = this[MODEL].createAllergen(name);
    this[VIEW].listDishes(
      this[MODEL].getDishesWithAllergen(allergen),
      allergen.name
    );
    this[VIEW].bindShowDish(this.handleShowDish);
  };
  // Método para manejar la lista de menús
  handleMenuList = (name) => {
    const menu = this[MODEL].createMenu(name);
    this[VIEW].listDishes(this[MODEL].getDishWithMenu(menu), menu.name);
    this[VIEW].bindShowDish(this.handleShowDish);
  };
  // Método para mostrar detalles de un restaurante
  handleShowRestaurant = (name) => {
    const restaurant = this[MODEL].createRestaurant(name);
    this[VIEW].showRestaurant(restaurant);
  };
  // Método para mostrar los detalles de un plato en una ventana de ficha de plato
  handleShowFileDish = (name, fileDishWindow) => {
    try {
      const dish = this[MODEL].createDish(name);
      console.log(dish);
      // Mostrarmos los detalles del plato utilizando la vista
      this[VIEW].showFileDish(dish, fileDishWindow);
    } catch (error) {
      // Mostramos un mensaje de error si no se encuentra el plato
      this[VIEW].showFileDish(
        null,
        fileDishWindow,
        "No existe este plato en la página"
      );
    }
  };
  // Método para cerrar una ventana de ficha de plato
  handleCloseFileWindow = (dish, window) => {
    // Cerramos la ventana de ficha de plato
    window.close();
    // Eliminamos el plato de la colección de ventanas de fichas
    this[VIEW].dishFileWindow.delete(dish);
  };

  handleNewCategoryForm = () => {
    // Muestra el formulario para crear una nueva categoría y enlaza sus selecciones
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  handleCreateCategory = (name, url, desc) => {
    // Crea una categoría o la devuelve si no esta creada
    const category = this[MODEL].createCategory(name, desc);
    category.setImagen(url);
    let done;
    let error;
    console.log(category);
    try {
      // Agrega la categoría al modelo
      this[MODEL].addCategory(category);
      done = true;

      // Añade la categoría al menu
      this.onAddCategory();
      console.log(this[MODEL]);
      alert("Se ha añadido la categoría " + category.getName());
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };

  handleRemoveCategoryForm = () => {
    // Muestra el formulario para eliminar categorías y enlaza sus selecciones
    this[VIEW].showRemoveCategoryForm(this[MODEL].categories);
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleRemoveCategory = (name) => {
    let done;
    let error;
    let cat;
    try {
      console.log("adios");

      // Crea un objeto de categoría a partir del nombre
      cat = this[MODEL].createCategory(name);
      console.log("adios2");
      console.log(this[MODEL]);

      // Elimina la categoría del modelo
      this[MODEL].removeCategory(cat);
      console.log("adios3");
      done = true;

      this.onAddCategory();
      this.handleRemoveCategoryForm();
      alert("Se ha eliminado la categoría " + cat.getName());
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };

  handleNewDishForm = () => {
    // Muestra el formulario para crear un nuevo plato y enlaza sus selecciones
    this[VIEW].showNewDishForm(this[MODEL].categories, this[MODEL].allergens);
    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleCreateDish = (name, desc, ingre, url, categories, allergens) => {
    let done;
    let error;
    let dish;

    try {
      // Crea un plato con la información proporcionada
      dish = this[MODEL].createDish(name, desc, ingre);
      dish.setImage(url);

      // Agrega el plato al modelo
      this[MODEL].addDish(dish);

      // Asigna las categorías al plato
      categories.forEach((title) => {
        const category = this[MODEL].createCategory(title);
        this[MODEL].assignCategoryToDish(dish, category);
      });

      // Asigna los alérgenos al plato
      allergens.forEach((title) => {
        const allergen = this[MODEL].createAllergen(title);
        this[MODEL].assignAllergenToDish(dish, allergen);
      });

      alert("Se ha creado el plato " + dish.getName());
      done = true;
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
    console.log(this[MODEL]);
  };

  handleRemoveDishForm = () => {
    // Muestra el formulario para eliminar platos y enlaza sus selecciones
    this[VIEW].showRemoveDishForm(this[MODEL].categories);
    this[VIEW].bindRemoveDishSelects(this.handleRemoveDishListByCategory);
  };

  handleRemoveDish = (name) => {
    let done;
    let error;
    let dish;
    try {
      alert(name);
      console.log("eliminar plato");

      // Crea un objeto de plato a partir del nombre
      dish = this[MODEL].createDish(name);
      console.log(dish);

      // Elimina el plato del modelo
      this[MODEL].removeDish(dish);
      console.log("eliminar plato remove");
      done = true;
      alert("Se ha eliminado el plato " + dish.getName());
    } catch (exception) {
      console.log(exception);
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };

  handleRemoveDishListByCategory = (category) => {
    console.log("1");

    // Crea un objeto de categoría a partir del nombre
    const cat = this[MODEL].createCategory(category);
    console.log("2");

    // Muestra la lista de platos para eliminar
    this[VIEW].showRemoveDishList(this[MODEL].getDishesInCategory(cat));
    console.log("3");

    // Enlaza la acción de eliminar plato
    this[VIEW].bindRemoveDish(this.handleRemoveDish);
    console.log("4");

    // Enlaza la acción de mostrar plato
    this[VIEW].bindShowDish(this.handleShowDish);
    console.log("5");
  };

  handleModifyMenu = () => {
    // Muestra el formulario para modificar menús y enlaza sus selecciones
    this[VIEW].showModifyMenuForm(this[MODEL].menus, this[MODEL].dishes);
    this[VIEW].bindModifyMenuSelects(this.handleModifyMenuForm);
  };

  handleModifyMenuForm = (nameM, dishM) => {
    let dishAssing;
    let menuAssing;
    let comprobacion;
    let correcto;
    let array = new Array();
    let done;
    let error;

    // Registra en la consola para depuración
    console.log("hola17");
    try {
      console.log("hola18");
      console.log(nameM);

      // Crea un objeto de menú a partir de la entrada
      menuAssing = this[MODEL].createMenu(nameM);
      console.log(menuAssing);
      console.log(this[MODEL]);
      console.log("hola19");

      // Crea un objeto de plato a partir de la entrada
      dishAssing = this[MODEL].createDish(dishM);

      // Obtiene los platos en el menú especificado
      comprobacion = this[MODEL].getDishWithMenu(menuAssing);

      // Comprueba si el plato ya está en el menú
      for (const comprob of comprobacion) {
        array.push(comprob);

        if (comprob === dishAssing) {
          correcto = comprob;
        }
      }

      // Si el plato ya está en el menú, muestra una alerta
      if (correcto) {
        alert(
          "El plato " +
            dishAssing.getName() +
            " ya existe en el menú  " +
            menuAssing.getName()
        );
      } else {
        // Asigna el plato al menú y muestra un mensaje de éxito
        this[MODEL].assignDishToMenu(menuAssing, dishAssing);
        alert(
          "Se ha asignado al menú " +
            menuAssing.getName() +
            " el plato " +
            dishAssing.getName()
        );
      }

      // Marca la operación como realizada y registra el estado del modelo
      done = true;
      console.log(this[MODEL]);
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };

  handleModifyMenuDesasig = () => {
    // Muestra el formulario para desasignar menús y enlaza sus selecciones
    this[VIEW].showModifyMenuDesasigForm(this[MODEL].menus, this[MODEL].dishes);
    this[VIEW].bindModifyMenuDesasigSelects(this.handleModifyMenuDesasigForm);
  };

  handleModifyMenuDesasigForm = (nameM, dishM) => {
    let dishDesasig;
    let menuDesasig;
    let comprobacion;
    let correcto;
    let array = new Array();
    let done;
    let error;

    // Registra en la consola para depuración
    console.log("hola17");
    try {
      console.log("hola18");
      console.log(nameM);

      // Crea un objeto de menú a partir de la entrada
      menuDesasig = this[MODEL].createMenu(nameM);
      console.log(menuDesasig);
      console.log(this[MODEL]);
      console.log("hola19");

      // Crea un objeto de plato a partir de la entrada
      dishDesasig = this[MODEL].createDish(dishM);

      // Obtiene los platos en el menú especificado
      comprobacion = this[MODEL].getDishWithMenu(menuDesasig);

      // Comprueba si el plato está en el menú
      for (const comprob of comprobacion) {
        array.push(comprob);

        if (comprob === dishDesasig) {
          correcto = comprob;
        }
      }

      // Si el plato está en el menú, lo desasigna y muestra un mensaje de éxito
      if (correcto) {
        this[MODEL].deassignDishToMenu(menuDesasig, dishDesasig);
        alert(
          "Se ha desasignado el plato " +
            dishDesasig.getName() +
            " del menú " +
            menuDesasig.getName()
        );
      } else {
        // Si el plato no está en el menú, muestra una alerta
        alert(
          "El plato " +
            dishDesasig.getName() +
            " no se ha podido desasignar del menú  " +
            menuDesasig.getName() +
            " porque este no lo contiene"
        );
      }

      // Marca la operación como realizada y registra el estado del modelo
      done = true;
      console.log(this[MODEL]);
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };

  handleNewRestaurantForm = () => {
    // Muestra el formulario para crear un nuevo restaurante y enlaza sus selecciones
    this[VIEW].showNewRestaurantForm();
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  handleCreateRestaurant = (name, description, url, latitud, longitud) => {
    // Crea un restaurante con la información proporcionada
    const rest = this[MODEL].createRestaurant(name, description);
    rest.setImage(url);
    rest.location = new Coordinate(latitud, longitud);

    let done;
    let error;

    try {
      console.log("createrest");

      // Agrega el restaurante al modelo
      this[MODEL].addRestaurant(rest);
      console.log("createrest2");
      done = true;
      console.log("createrest3");

      this.onAddRestaurant();
      console.log("createrest4");
      console.log(this[MODEL]);
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };
  handleAssingCategory = () => {
    // Muestra el formulario para asignar categorías y enlaza sus selecciones
    this[VIEW].showAssingCategoryForm(
      this[MODEL].categories,
      this[MODEL].dishes
    );
    this[VIEW].bindAssingCategorySelects(this.handleAssingCategoryForm);
  };

  handleAssingCategoryForm = (category, dishM) => {
    let categoryAssing;
    let dishAssing;
    let comprobacion;
    let correcto;
    let array = new Array();
    let done;
    let error;

    console.log("hola20");
    try {
      console.log("hola21");
      console.log(this[MODEL]);

      // Crea un objeto de categoría a partir de la entrada
      categoryAssing = this[MODEL].createCategory(category);
      console.log(categoryAssing);
      console.log(this[MODEL]);
      console.log("hola22");

      // Crea un objeto de plato a partir de la entrada
      dishAssing = this[MODEL].createDish(dishM);

      // Obtiene los platos en la categoría especificada
      comprobacion = this[MODEL].getDishesInCategory(categoryAssing);

      // Comprueba si el plato ya está en la categoría
      for (const comprob of comprobacion) {
        array.push(comprob);

        if (comprob === dishAssing) {
          correcto = comprob;
        }
      }

      // Si el plato ya está en la categoría, muestra una alerta
      if (correcto) {
        alert(
          "El plato " +
            dishAssing.getName() +
            " ya contiene la categoría " +
            categoryAssing.getName()
        );
      } else {
        // Asigna la categoría al plato y muestra un mensaje de éxito
        this[MODEL].assignCategoryToDish(dishAssing, categoryAssing);
        alert(
          "Se ha asignado la categoría " +
            categoryAssing.getName() +
            " al plato " +
            dishAssing.getName()
        );
      }

      // Marca la operación como realizada y registra el estado del modelo
      done = true;
      console.log(this[MODEL]);
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };

  handleDesasigCategory = () => {
    // Muestra el formulario para desasignar categorías y enlaza sus selecciones
    this[VIEW].showDesasigCategoryForm(
      this[MODEL].categories,
      this[MODEL].dishes
    );
    this[VIEW].bindDesasigCategorySelects(this.handleDesasigCategoryForm);
  };

  handleDesasigCategoryForm = (category, dishM) => {
    let categoryDesasig;
    let dishDesasig;
    let comprobacion;
    let correcto;
    let array = new Array();
    let done;
    let error;

    //Consola para depuración
    console.log("hola20");
    try {
      console.log("hola21");
      console.log(this[MODEL]);

      // Crea un objeto de categoría a partir de la entrada
      categoryDesasig = this[MODEL].createCategory(category);
      console.log(categoryDesasig);
      console.log(this[MODEL]);
      console.log("hola22");

      // Crea un objeto de plato a partir de la entrada
      dishDesasig = this[MODEL].createDish(dishM);

      // Obtiene los platos en la categoría especificada
      comprobacion = this[MODEL].getDishesInCategory(categoryDesasig);

      // Comprueba si el plato está en la categoría
      for (const comprob of comprobacion) {
        array.push(comprob);

        if (comprob === dishDesasig) {
          correcto = comprob;
        }
      }

      // Si el plato está en la categoría, lo desasigna y muestra un mensaje de éxito
      if (correcto) {
        this[MODEL].deassignCategoryToDish(dishDesasig, categoryDesasig);
        alert("Se ha desasignado el plato correctamente");
      } else {
        // Si el plato no está en la categoría, muestra una alerta
        alert("El plato no contiene la categoría seleccionada");
      }
      // Marca la operación como realizada y registra el estado del modelo
      done = true;
      console.log(this[MODEL]);
    } catch (exception) {
      // Si ocurre un error, marca la operación como no realizada y almacena el error
      done = false;
      error = exception;
    }
  };
  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  handleLogin = (username, password, remember) => {
    if (this[AUTH].validateUser(username, password)) {
      this[USER] = this[AUTH].getUser(username);
      this.onOpenSession();
    } else {
      this[VIEW].showInvalidUserMessage();
    }
    if (remember) {
      this[VIEW].setUserCookie(this[USER]);
    }
  };

  handleCloseSession = () => {
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
  };
}

export default ManagerController;
