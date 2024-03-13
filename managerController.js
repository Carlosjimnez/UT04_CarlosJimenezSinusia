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
  }

  [LOAD_MANAGER_OBJECTS](data) {
    const { categories, dishes, allergens, menus, restaurants } = data;

    // Crear y agregar categorías al modelo
    categories.forEach((categoryData) => {
      const category = this[MODEL].createCategory(categoryData.name);
      category.description = categoryData.description;
      category.imagen = categoryData.imagen;
      this[MODEL].addCategory(category);
    });

    // Crear y agregar menús al modelo
    menus.forEach((menuData) => {
      const menu = this[MODEL].createMenu(menuData.name);
      this[MODEL].addMenu(menu);
    });

    // Crear y agregar alérgenos al modelo
    allergens.forEach((allergenData) => {
      const allergen = this[MODEL].createAllergen(allergenData.name);
      this[MODEL].addAllergen(allergen);
    });

    // Crear y agregar platos al modelo
    dishes.forEach((dishData) => {
      const dish = this[MODEL].createDish(dishData.name);
      dish.description = dishData.description;
      dish.ingredients = dishData.ingredients;
      dish.image = dishData.image;

      // Asignar categoría al plato
      if (dishData.category) {
        const category = this[MODEL].createCategory(dishData.category);
        this[MODEL].assignCategoryToDish(dish, category);
      }

      // Asignar menús al plato
      if (dishData.menus) {
        dishData.menus.forEach((menuName) => {
          const menu = this[MODEL].createMenu(menuName);
          this[MODEL].assignDishToMenu(menu, dish);
        });
      }
      //Error
      // Asignar alérgenos al plato
      if (dishData.allergen) {
        console.log("Holaaaaaaaa");

        // dishData.allergens.forEach((allergenName) => {
        //   const allergen = this[MODEL].createAllergen(allergenName);
        //   console.log(allergen);
        //   this[MODEL].assignAllergenToDish(dish, allergen);
        // });
        for (const all of allergens) {
          const allergen = this[MODEL].createAllergen(all);

          this[MODEL].assignAllergenToDish(dish, allergen);
        }
      }
    });

    // Crear y agregar restaurantes al modelo
    restaurants.forEach((restaurantData) => {
      const restaurant = this[MODEL].createRestaurant(restaurantData.name);
      restaurant.description = restaurantData.description;
      restaurant.location = new Coordinate(
        restaurantData.location.latitude,
        restaurantData.location.longitude
      );
      restaurant.image = restaurantData.image;
      this[MODEL].addRestaurant(restaurant);
    });
  }

  //Método para manejar la carga de la página
  onLoad = () => {
    // Hacemos un fetch para cargar todos los datos iniciales de nuestra aplicación
    // que se encuentran en el JSON que está dentro de nuestra carpeta data
    fetch("./data/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Llamamos al método correspondiente para cargar los datos
        this[LOAD_MANAGER_OBJECTS](data);
        this.onInit();
        this[VIEW].bindInit(this.handleInit);
        this.onAddCategory(); // Menu categorías
        this.onAddAllergen(); // Menu alérgenos
        this.onAddMenu(); // Menu de los menús del restaurante
        this.onAddRestaurant(); // Menu de restaurantes
        this.onCloseFileWindow(); // Botón para cerrar ventanas

        // Verificamos si se ha aceptado el mensaje de la cookie
        // Si no se aceptó, lo mostraremos al usuario desde nuestra vista
        if (getCookie("acceptedCookieMessage") !== "true") {
          this[VIEW].showCookiesMessage(); // Función que creamos en nuestra vista para mostrar el mensaje de la cookie
        }

        // Verificamos si hay una cookie de usuario guardada
        const userCookie = getCookie("activeUser");

        // Si existe la cookie, intentamos iniciar sesión automáticamente
        if (userCookie) {
          const user = this[AUTH].getUser(userCookie);
          if (user) {
            this[USER] = user;
            this.onOpenSession();
          }
        } else {
          // Si no hay una cookie de usuario, cerramos la sesión
          this.onCloseSession();
        }
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
      });
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
  // Método para abrir sesión de usuario
  onOpenSession() {
    alert("Hola " + this[USER].username);
    this.onInit();
    // Inicializar el historial del navegador
    this[VIEW].initHistory();
    // Mostrar el perfil de usuario autenticado
    this[VIEW].showAuthUserProfile(this[USER]);
    // Enlazar la funcionalidad para cerrar sesión
    this[VIEW].bindCloseSession(this.handleCloseSession);
    // Mostrar el menú de administrador
    this[VIEW].showAdminMenu();
    // Enlazar la funcionalidad del menú de administrador
    this[VIEW].bindAdminMenu(
      // Funciones manejadoras para formularios y acciones de administrador
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleModifyMenu,
      this.handleModifyMenuDesasig,
      this.handleNewRestaurantForm,
      this.handleAssingCategory,
      this.handleDesasigCategory,
      this.generarBackup
    );
  }

  // Método para cerrar sesión de usuario
  onCloseSession() {
    // Establecer el usuario como nulo
    this[USER] = null;
    // Eliminar la cookie de usuario
    this[VIEW].deleteUserCookie();
    // Mostrar el enlace de identificación
    this[VIEW].showIdentificationLink();
    // Enlazar la funcionalidad del enlace de identificación
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    // Eliminar el menú de administrador
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
  // Manejador para el formulario de inicio de sesión
  handleLoginForm = () => {
    // Mostrar el formulario de inicio de sesión
    this[VIEW].showLogin();
    // Enlazar la funcionalidad para enviar el formulario de inicio de sesión
    this[VIEW].bindLogin(this.handleLogin);
  };

  // Manejador para el inicio de sesión
  handleLogin = (username, password, remember) => {
    // Validar las credenciales del usuario
    if (this[AUTH].validateUser(username, password)) {
      // Obtener información del usuario
      this[USER] = this[AUTH].getUser(username);
      // Abrir sesión para el usuario

      this.onOpenSession();
    } else {
      // Mostrar mensaje de usuario no válido si las credenciales son incorrectas
      this[VIEW].showInvalidUserMessage();
    }
    // Si se selecciona la opción de recordar usuario, establecer la cookie del usuario
    if (remember) {
      this[VIEW].setUserCookie(this[USER]);
    }
  };

  // Manejador para cerrar sesión
  handleCloseSession = () => {
    // Cerrar sesión
    this.onCloseSession();
    // Inicializar la aplicación
    this.onInit();
    // Inicializar el historial del navegador
    this[VIEW].initHistory();
  };

  generarBackup = () => {
    // Crear un objeto para almacenar los datos de la aplicacion
    const data = {
      categories: [],
      dishes: [],
      allergens: [],
      menus: [],
      restaurants: [],
    };

    // Recorrer las categorias y añadir al objeto de datos
    for (let i = 0; i < this[MODEL].categories.length; i++) {
      const category = this[MODEL].categories[i];
      data.categories.push({
        name: category.name,
        description: category.description,
        imagen: category.imagen,
      });
    }

    // Recorrer los platos y añadir al objeto de datos
    for (let i = 0; i < this[MODEL].dishes.length; i++) {
      const dish = this[MODEL].dishes[i];
      console.log(dish);
      const dishData = {
        name: dish.dish.name,
        description: dish.dish.description,
        ingredients: dish.dish.ingredients,
        image: dish.image,
      };
      // for (let j = 0; j < dish.dish.ingredients.length; j++) {
      //   dishData.ingredients.push(dish.dish.ingredients[j]);
      // }
      data.dishes.push(dishData);
    }

    // Recorrer los alergenos y añadir al objeto de datos
    for (let i = 0; i < this[MODEL].allergens.length; i++) {
      const allergen = this[MODEL].allergens[i];
      data.allergens.push({ name: allergen.name });
    }

    // Recorrer los menus y añadir al objeto de datos
    for (let i = 0; i < this[MODEL].menus.length; i++) {
      const menu = this[MODEL].menus[i];
      data.menus.push({ name: menu.menu.name });
    }

    // Recorrer los restaurantes y añadir al objeto de datos
    for (let i = 0; i < this[MODEL].restaurants.length; i++) {
      const restaurant = this[MODEL].restaurants[i];
      const restaurantData = {
        name: restaurant.name,
        description: restaurant.description,
        coordinates: {
          latitude: restaurant.location.latitude,
          longitude: restaurant.location.longitude,
        },
        image: restaurant.image,
      };
      data.restaurants.push(restaurantData);
    }

    // Generar el nombre del archivo de copia de seguridad con la fecha actual
    const currentDate = new Date();
    const fileName = `Backup_${currentDate.getFullYear()}_${
      currentDate.getMonth() + 1
    }_${currentDate.getDate()}.json`;

    // Convertir los datos a JSON
    const jsonData = JSON.stringify(data);

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("json", jsonData);

    // Realizar la solicitud fetch para guardar el archivo de copia de seguridad en el servidor
    fetch("backup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Fallo en el Backup");
        } else {
          console.log("Backup creado");
        }
      })
      .catch((error) => {
        console.error("Error al generar el backup:", error);
      });
  };
}

export default ManagerController;
