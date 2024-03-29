import {
  newCategoryValidation,
  newDishValidation,
  modifyValidationForm,
  modifyDesasigValidationForm,
  newRestaurantValidation,
  assingCategoryValidationForm,
  desasigCategoryValidationForm,
} from "./validation.js";

import { setCookie } from "./utils.js";
const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class ManagerView {
  constructor() {
    this.inicio = document.getElementById("inicioT"); // Cambio aquí
    this.centro = document.getElementById("centro");
    this.menuses = document.querySelector(".nav_ul");
    this.dishFileWindow = new Array();
    this.dishFileWindows = {};
  }
  [EXCECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }
  // Esta función asigna eventos de clic al botón init y al logo para manejar la inicialización de la aplicación
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }
  //Mostrará todas la categorias que tenemos en la zon que hemos marcado como centro
  showCategories(categories) {
    // Eliminamos la fila
    if (this.centro.children.length > 0) this.centro.children[0].remove();

    // Creamos un contenedor con el elemento div
    const categoryContainer = document.createElement("div");

    // Le añadimos una clase y una id a nuestro contenedor de categorias
    categoryContainer.classList.add("row");
    categoryContainer.id = "dish-list";

    // Insertamos titulo
    categoryContainer.insertAdjacentHTML("beforeend", `<h1>Categorias</h1>`);

    for (const category of categories) {
      //Insertamos la informacion de las categorias en el categoryContainer
      categoryContainer.insertAdjacentHTML(
        "beforeend",
        `
            <div class=dish-category>
            <a data-category="${category.name}" href="#dish">
                <h3>${category.name}</h3>
                <img src="${category.imagen}" alt="${category.name}" style="max-width: 100%; height: auto; text-align:center;">
                </a>
                </div>
        `
      );
    }
    this.centro.append(categoryContainer);
  }
  // Esta función muestra una lista de platos aleatorios en la página de inicio
  showRandomDishes(dishes) {
    // Eliminamos las filas  existentes
    if (this.inicio.children.length > 0) this.inicio.children[0].remove();

    // Creo un elemento div
    const container = document.createElement("div");

    container.classList.add("row");
    container.id = "random";
    // Insertar un título para la sección de platos aleatorios
    container.insertAdjacentHTML(
      "beforeend",
      `
      <h2>Algunos de Nuestros Platos</h2>
      `
    );

    // Iteramos sobre cada plato aleatorio y agregarlo al contenedor
    for (const dish of dishes) {
      //Insertamos con estilos la informacion de los platos
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div>
          <a data-dish="${dish.name}" href="#dish-cart">
            <h5>${dish.dish.name}</h5>
            <img class=dish-random src="${dish.dish.image}" alt="${dish.dish.name}" ">
          </a>
        </div>
        `
      );
    }

    // Insertamos el contenedor en nuestro html con el contenido de nuestros platos
    this.inicio.append(container);
  }
  // Esta función asigna eventos de clic a los platos aleatorios para manejar su visualización detallada
  bindRandomDishes(handler) {
    // Obtener la lista de platos aleatorios
    const randomList = document.getElementById("random");
    // Obtener todos los enlaces dentro de la lista de platos aleatorios
    const links = randomList.querySelectorAll("a");
    // Iteramos sobre los enlaces y asignar un evento de clic a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtener el nombre del plato desde el atributo data del enlace
        const { dish } = event.currentTarget.dataset;

        // Ejecutamos el controlador proporcionado
        this[EXCECUTE_HANDLER](
          // Controlador a ejecutar
          handler,
          // Parámetros que se pasarán al controlador
          [dish],
          //Elemento sobre el cual se ejecutará el controlador
          "#dish-cart",
          { action: "dishRandom", dish },
          "#dish-cart",
          event
        );
      });
    }
  }
  //Muestra las categorías en el menú desplegable de la barra de navegación
  showCategoriesInMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#productlist">${category.name}</a></li>`
      );
    }
  }

  //Cuando hagamos click en el nombre o la imagen de las categorias
  //mostrará los platos que contiene esa categoria

  bindCategoryList(handler) {
    // Obtenemos el elemento donde se encuentran las categorías
    const categories = document.getElementById("dish-list");

    const links = categories.querySelectorAll("a");

    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos nuestra categoria
        const { category } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#dish",
          { action: "categoryList", category },
          "#dish",
          event
        );
      });
    }
  }

  //Hace los mismo que el anterior pero en el navegador
  bindCategorysListInMenu(handler) {
    const navCats = document.getElementById("navCats");
    const links = navCats.nextElementSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos nuestra categoria
        const { category } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#dish-list",
          { action: "categoryList", category },
          "#dish-list",
          event
        );
      });
    }
  }

  //Muestra allergen en el nav y  con el un desplegable que con todo los alergenos que tenemos
  showAllergensInMenu(allergens) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a href="#" id="navAller" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Alergenos</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#aller">${allergen.name}</a></li>`
      );
    }
    li.append(container);
    this.menuses.append(li);
  }

  //Controlador de cuando hagamos click en alguno de los alergenos del desplegable
  //muestre los platos que contienen ese alergeno

  bindAllergenList(handler) {
    const navAller = document.getElementById("navAller");
    const links = navAller.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        const { allergen } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          "#aller",
          { action: "allergenList", allergen },
          "#aller",
          event
        );
      });
    }
  }
  //Muestra menus en el nav y  con el un desplegable que con todo los menus que tenemos
  showMenusInMenu(menus) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");

    li.insertAdjacentHTML(
      "beforeend",
      `<a  href="#" id="navMenu" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Menus</a>`
    );

    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#menu">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menuses.append(li);
  }
  //Controlador de cuando hagamos click en alguno de los menus del desplegable
  //muestre los platos que contienen ese menu
  bindMenuList(handler) {
    const navMenu = document.getElementById("navMenu");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos los menus
        const { menu } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          "#menu",
          { action: "menuList", menu },
          "#menu",
          event
        );
      });
    }
  }
  //Muestra restaurantes en el nav y los diferentes restaurantes que tiene
  showRestaurantsInMenu(restaurants) {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a  href="#" id="navRest" role="button"
			data-bs-toggle="dropdown" >Restaurantes</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item"  href="#restaurants">${restaurant.name}</a></li>`
      );
    }
    li.append(container);
    this.menuses.append(li);
  }
  //Muestra los detalles del restaurante seleccionado
  showRestaurant(restaurant) {
    //Limpiamos la zona central
    this.centro.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("row");

    // Si tenemos información del restaurante, la mostramos
    if (restaurant) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div>
          <div>
            <h2>${restaurant.name}</h2>
            <p >${restaurant.description}</p>
            <h5 >Localización</h5>
            <p >${restaurant.location}</p>
          </div>
          <div>
            <img src=${restaurant.image} alt="">
          </div> 
        </div>
        `
      );
    }

    // Insertamos la ficha del restaurante en el centro de la página
    this.centro.append(container);
  }
  //Asigna eventos de clic a los restaurantes en el menú desplegable
  bindRestaurant(handler) {
    const navRest = document.getElementById("navRest");

    // Obtenemos los elementos a
    const links = navRest.nextSibling.querySelectorAll("a");

    // Recorremos los links que hemos recogido
    // y obtenemos el valor de nuestros menus
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos el objeto de restaurante
        const { restaurant } = event.currentTarget.dataset;

        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          "#restaurants",
          { action: "restaurantList", restaurant },
          "#restaurants",
          event
        );
      });
    }
  }

  //Muestra una lista de platos en el centro de la página
  listDishes(dishes, name) {
    this.centro.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("row");
    container.id = "dish-list";

    // Insertar el nombre de la categoría de platos en el contenedor
    container.insertAdjacentHTML("beforeend", `<h3>${name}</h3>`);

    // Recorremos nuestros platos y los mostramos
    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="dish-container">
            <a data-dish="${dish.name}" href="#dish">
              <div>
                  <h5>${dish.name}</h5>
                </div>
                <div>
                <img class="dish-image" src="${dish.image}" alt="">
                <div class="dish-info">
                  <p>${dish.description}</p>
                  <h5>Ingredientes</h5>
                  <p>${dish.ingredients}</p>
                </div>
                </div>
                <div>
                <button class="btn push-botom" data-dish="${dish.name}" class="btn">Ver Ficha</button>
                </div>
                </a>
            </div>
            `
      );
    }
    // Agregamos el contenedor al centro de la página
    this.centro.append(container);
  }
  // Esta función asigna eventos de clic para mostrar o ocultar la información del plato al hacer clic en su contenedor
  bindShowDish(handler) {
    //Controlamos los clicks de las imagenes y los titulos para que muestre la descripcion y los ingredientes

    //No sabia si ya habia que quitar esta parte porque como ya tenemos el boton
    //para ver la ficha no se ve necesario pero lo he dejado por si acaso
    const dishContainers = document.querySelectorAll(".dish-container");

    dishContainers.forEach((container) => {
      container.addEventListener("click", () => {
        const dishInfo = container.querySelector(".dish-info");
        if (dishInfo) {
          dishInfo.style.display =
            dishInfo.style.display === "none" ? "block" : "none";
        }

        const dishNameElement = container.querySelector("h5");
        if (dishNameElement) {
          dishNameElement.style.display =
            dishNameElement.style.display === "none" ? "block" : "block";
        }
      });
    });
    const list_dish = document.getElementById("dish-list");
    // Obtenemos los enlaces
    const links = list_dish.querySelectorAll("a");

    // Recorremos los enlaces
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos el nombre de nuestro plato
        const { dish } = event.currentTarget.dataset;
        // Llamamos a nuestro metodo execute handler que declaramos anteriormente
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#dish",
          { action: "showDish", dish },
          "#dish",
          event
        );
      });
    }
  }

  // Esta función muestra los detalles de un plato en una ventana de ficha de plato
  showFileDish(dish, fileDishWindow) {
    console.log(dish);

    // Obtenemos el elemento main de la ventana de ficha de plato
    const mainFile = fileDishWindow.document.querySelector("main");

    // Limpiamos el contenido del elemento main
    mainFile.replaceChildren();

    // Declaramos una variable para contener el contenedor de la ficha del plato
    let container;

    // Ponemos el título del documento de la ventana de ficha

    container = document.createElement("div");
    container.id = "dishFile";
    container.classList.add("dishFile");

    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="ficha" >
          <div>
            <h5>${dish.name}</h5>
            <h5>Descripción</h5>
            <p>${dish.description}</p>
            <h5>Ingredientes</h5>
            <p>${dish.ingredients}</p>
          </div>
          <div>
            <img src=${dish.image} style=" width: 18rem;
            height: 14rem;">
          </div>
        </div>
      `
    );

    // Agregarmos el contenedor a la ventana de ficha de plato
    mainFile.append(container);

    // Desplazamos la vista de la ventana de ficha de plato para que el contenido sea visible
    fileDishWindow.document.body.scrollIntoView();
  }

  // Método para mostrar la ficha de un plato
  showDish(dish, handler) {
    // Seleccionar todos los botones de la clase "push-botom"
    const pushButtons = document.querySelectorAll(".push-botom");

    // Iterar sobre cada botón
    pushButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Obtener el nombre del plato desde el atributo "data-dish" del botón clickeado
        const dishName = event.currentTarget.dataset.dish;

        // Verificar si ya hay una ventana de ficha abierta para este plato
        if (
          this.dishFileWindows[dishName] &&
          !this.dishFileWindows[dishName].closed
        ) {
          // Si la ventana ya está abierta, enfocarla
          this.dishFileWindows[dishName].focus();
        } else {
          // Si no existe o está cerrada, abrir una nueva ventana de ficha
          const fileWindow = window.open(
            "fichaDishes.html",
            dishName,
            "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
          );

          // Registrar la nueva ventana de ficha en el objeto
          this.dishFileWindows[dishName] = fileWindow;

          // Agregar un evento para cargar el contenido de la ventana de ficha
          fileWindow.addEventListener("DOMContentLoaded", () => {
            handler(dishName, fileWindow);
          });
        }

        // Prevenir el comportamiento predeterminado del enlace
        event.preventDefault();
      });
    });
  }

  // Método para mostrar un enlace en la barra de navegación para cerrar todas las ventanas de fichas
  showCloseFilesWindow() {
    // Crear un elemento de lista
    const li = document.createElement("li");
    li.classList.add("nav_li");

    // Insertar un enlace para cerrar todas las ventanas de fichas
    li.insertAdjacentHTML(
      "beforeend",
      `<a id="close" href="#">Cerrar Fichas</a>`
    );

    // Agregar el elemento de lista al menú
    this.menuses.append(li);
  }

  // Método para asignar un evento de clic al enlace para cerrar todas las ventanas de fichas
  bindShowCloseFilesWindow(handler) {
    const closeWindow = document.getElementById("close");

    // Agregar un evento de clic al enlace para cerrar todas las ventanas de fichas
    closeWindow.addEventListener("click", (event) => {
      // Cerrar todas las ventanas de fichas abiertas
      for (const dishName in this.dishFileWindows) {
        if (
          this.dishFileWindows.hasOwnProperty(dishName) &&
          !this.dishFileWindows[dishName].closed
        ) {
          this.dishFileWindows[dishName].close();
        }
      }

      // Restablecer el objeto dishFileWindows a un objeto vacío
      this.dishFileWindows = {};
    });
  }

  // Función para mostrar el menú de administración
  showAdminMenu() {
    // Crear un elemento de lista para el menú
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    // Insertar el enlace principal del menú
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">Adminitración</a>'
    );
    // Crear una lista desplegable para las opciones del menú
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    // Insertar las diferentes opciones del menú
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelCategory" class="dropdown-item" href="#del-category">Eliminar categoría</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewDish" class="dropdown-item" href="#new-dish">Crear plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldelDish" class="dropdown-item" href="#del-dish">Eliminar plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lnewRestaurant" class="dropdown-item" href="#new-restaurant">Crear Restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lmodifyMenu" class="dropdown-item" href="#modify-menu">Asignar Plato a Menu</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lmodifyMenuDesasig" class="dropdown-item" href="#modify-menuDesasig">Desasignar Plato de Menu</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lassingCategory" class="dropdown-item" href="#assing-category">Asignar Categoria</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="ldesasigCategory" class="dropdown-item" href="#desasig-category">Desasignar Categoria</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="lbackup" class="dropdown-item" href="#generar-backup">Generar Objetos</a></li>'
    );
    // Agregar las opciones al menú principal
    menuOption.append(suboptions);
    this.menuses.append(menuOption);
  }

  // Función para enlazar los eventos del menú de administración con los manejadores correspondientes
  bindAdminMenu(
    hNewCategory,
    hRemoveCategory,
    hNewDishForm,
    hRemoveDish,
    hModifyMenu,
    hModifyMenuDesasig,
    hnewRestaurant,
    hAssingCategory,
    hDesasigCategory,
    hBackup
  ) {
    // Obtener los elementos de las opciones del menú
    const newCategoryLink = document.getElementById("lnewCategory");
    const delCategoryLink = document.getElementById("ldelCategory");
    const newPlatolink = document.getElementById("lnewDish");
    const delPlatoLink = document.getElementById("ldelDish");
    const newRestaurant = document.getElementById("lnewRestaurant");
    const modifyMenuLink = document.getElementById("lmodifyMenu");
    const modifyMenuDesasigLink = document.getElementById("lmodifyMenuDesasig");
    const assingCategory = document.getElementById("lassingCategory");
    const desasigCategory = document.getElementById("ldesasigCategory");
    const backup = document.getElementById("lbackup");

    // Agregar eventos a cada opción del menú
    newCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    delCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveCategory,
        [],
        "#remove-category",
        {
          action: "removeCategory",
        },
        "#",
        event
      );
    });

    newPlatolink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hNewDishForm,
        [],
        "#new-dish",
        {
          action: "newDish",
        },
        "#",
        event
      );
    });

    delPlatoLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hRemoveDish,
        [],
        "#remove-dish",
        {
          action: "removeDish",
        },
        "#",
        event
      );
    });

    newRestaurant.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hnewRestaurant,
        [],
        "#new-restaurant",
        {
          action: "newRestaurant",
        },
        "#",
        event
      );
    });

    modifyMenuLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hModifyMenu,
        [],
        "#modify-menu",
        {
          action: "modifyMenu",
        },
        "#",
        event
      );
    });

    modifyMenuDesasigLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hModifyMenuDesasig,
        [],
        "#modify-menuDesasig",
        {
          action: "modifyMenuDesasig",
        },
        "#",
        event
      );
    });

    assingCategory.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hAssingCategory,
        [],
        "#assing_category",
        {
          action: "assingCategory",
        },
        "#",
        event
      );
    });

    desasigCategory.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hDesasigCategory,
        [],
        "#desasig_category",
        {
          action: "desasigCategory",
        },
        "#",
        event
      );
    });
    backup.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        hBackup,
        [],
        "#generar-backup",
        {
          action: "generarBackup",
        },
        "#",
        event
      );
    });
  }

  // Función para mostrar el formulario de nueva categoría
  showNewCategoryForm() {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();
    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";
    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nueva categoría</h1>'
    );
    // Insertar el formulario HTML dentro del contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
      <div class="col-md-6 mb-3">
        <label class="form-label" for="ncTitle">Título *</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-type"></i></span>
          <input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría" value="" required>
          <div class="invalid-feedback">El título es obligatorio.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label" for="ncUrl">URL de la imagen *</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-fileimage"></i></span>
          <input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="URL de la imagen" value="" required>
          <div class="invalid-feedback">La URL no es válida.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label class="form-label" for="ncDescription">Descripción</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-bodytext"></i></span>
          <input type="text" class="form-control" id="ncDescription" name="ncDescription" value="">
          <div class="invalid-feedback"></div>
          <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
    </form>`
    );
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar el formulario de nueva categoría con su validación
  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  // Función para mostrar el formulario de eliminación de categorías
  showRemoveCategoryForm(categories) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();
    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-category";
    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar una categoría</h1>'
    );
    // Crear un contenedor div para las categorías
    const row = document.createElement("div");
    row.classList.add("row");
    // Insertar las categorías en el contenedor
    for (const category of categories) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md6"><a data-category="${category.name}" href="#dish-list">
          <div ><img class="dish-image" alt="${category.imagen}" src="${category.imagen}" /></div>
          <div class="cat-list-text">
            <h3>${category.name}</h3>
            <div>${category.description}</div>
          </div>
          <div><button class="btn btn-primary" data-category="${category.name}" type='button'>Eliminar</button></div>
        </a></div>`
      );
    }
    // Agregar las categorías al contenedor
    container.append(row);
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar el formulario de eliminación de categorías con su manejo
  bindRemoveCategoryForm(handler) {
    // Obtener el contenedor de eliminación de categorías
    const removeContainer = document.getElementById("remove-category");
    // Obtener los botones de eliminación
    const buttons = removeContainer.getElementsByTagName("button");
    // Agregar eventos a cada botón de eliminación
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  // Función para mostrar el formulario de nuevo plato
  showNewDishForm(categories, allergens) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-dish";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo Plato</h1>'
    );

    // Crear un formulario
    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    // Insertar los campos del formulario
    // Nombre del plato
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
      <label class="form-label" for="npName">Nombre</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-pen"></i></span>
        <input type="text" class="form-control" id="npName" name="npName"
          placeholder="Nombre" value="" required>
        <div class="invalid-feedback">El nombre es obligatorio</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Descripción del plato
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
      <label class="form-label" for="npDesc">Descripción</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-hash"></i></span>
        <input type="text" class="form-control" id="npDesc" name="npDesc"
          placeholder="Descripcion" value="" required>
        <div class="invalid-feedback">La descripcion es obligatoria.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Ingredientes del plato
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-3">
      <label class="form-label" for="npIngre">Ingredientes</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-hash"></i></span>
        <input type="text" class="form-control" id="npIngre" name="npIngre"
          placeholder="Ingredientes" value="" required>
        <div class="invalid-feedback">El ingrediente es obligatorio.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // URL del plato
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npUrl">URL *</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-card-image"></i></span>
        <input type="url" class="form-control" id="npUrl" name="npUrl"
          placeholder="http://www.test.es" value="" min="0" step="1" required>
        <div class="invalid-feedback">La URL no es válida.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Categorías del plato
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-3">
      <label class="form-label" for="npCategories">Categorías *</label>
      <div class="input-group">
        <label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npCategories" id="npCategories" multiple required>
        </select>
        <div class="invalid-feedback">El plato debe pertenecer al menos a una categoría.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Alergenos del plato
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-3">
      <label class="form-label" for="npAlergens">Alergenos *</label>
      <div class="input-group">
        <label class="input-group-text" for="npAlergens"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npAlergens" id="npAlergens" multiple required>
        </select>
        <div class="invalid-feedback">El debe tener al menos un alergeno asignado.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );

    // Agregar las categorías al select de categorías
    const npCategories = form.querySelector("#npCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }
    // Agregar los alergenos al select de alergenos
    const npAlergens = form.querySelector("#npAlergens");
    for (const allergen of allergens) {
      npAlergens.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.name}">${allergen.name}</option>`
      );
    }

    // Insertar los botones de enviar y cancelar
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
      <button class="btn btn-primary" type="submit">Enviar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );

    // Agregar el formulario al contenedor
    container.append(form);
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar el formulario de nuevo plato con su validación
  bindNewDishForm(handler) {
    newDishValidation(handler);
  }

  // Función para mostrar el formulario de eliminación de platos
  showRemoveDishForm(categories) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-dish";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un Plato</h1>'
    );

    // Crear un formulario
    const form = document.createElement("form");
    form.name = "fRemoveDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    // Insertar el select de categorías
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npCategories">Categorías del producto</label>
      <div class="input-group">
        <label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="rpCategories" id="rpCategories">
          <option disabled selected>Selecciona una categoría</option>
        </select>
      </div>
    </div>`
    );

    // Agregar las categorías al select de categorías
    const rpCategories = form.querySelector("#rpCategories");
    for (const category of categories) {
      rpCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    // Agregar el formulario al contenedor
    container.append(form);
    // Insertar el contenedor de la lista de platos en el contenedor principal
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="dish-list" class="container my-3"><div class="row"></div></div>'
    );
    // Agregar el contenedor principal al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar los selectores del formulario de eliminación de platos
  bindRemoveDishSelects(hCategories) {
    // Obtener el select de categorías
    const rpCategories = document.getElementById("rpCategories");
    // Agregar un evento de cambio al select de categorías
    rpCategories.addEventListener("change", (event) => {
      // Ejecutar el manejador con los parámetros correspondientes
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-dish",
        { action: "removeDishByCategory", category: event.currentTarget.value },
        "#remove-dish",
        event
      );
    });
  }

  // Función para mostrar la lista de platos a eliminar
  showRemoveDishList(dishes) {
    // Obtener el contenedor de la lista
    const listContainer = document
      .getElementById("dish-list")
      .querySelector("div.row");
    // Limpiar el contenido existente
    listContainer.replaceChildren();

    // Variable para verificar si existen platos
    let exist = false;
    // Iterar sobre los platos y agregarlos a la lista
    for (const dish of dishes) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="col-md-4 rProduct">
        <figure class="card card-product-grid card-lg"> <a data-name="${dish.name}" href="#dish" class="img-wrap"><img src="${dish.image}" class="dish-image"></a>
          <figcaption class="info-wrap">
            <div class="row">
              <div class="col-md-8"> <a data-name="${dish.name}" href="#dish" class="title">${dish.name}</a> </div>
              <div class="col-md-4">
                <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
              </div>
            </div>
          </figcaption>
          <div class="bottom-wrap"> <a href="#" data-name="${dish.name}" class="btn btn-primary float-right"> Eliminar </a>
          </div>
        </figure>
      </div>`
      );
    }
    // Mostrar un mensaje si no hay platos disponibles
    if (!exist) {
      listContainer.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>'
      );
    }
  }

  // Función para enlazar el evento de eliminación de platos
  bindRemoveDish(handler) {
    // Obtener todos los botones de eliminar
    const dishList = document.getElementById("dish-list");
    const buttons = dishList.querySelectorAll("a.btn");
    // Agregar un evento clic a cada botón
    for (const button of buttons) {
      button.addEventListener("click", (event) => {
        // Manejar el evento de clic
        alert(event.currentTarget.dataset.name); // Solo para pruebas, eliminar luego
        handler(event.currentTarget.dataset.name);
        event.preventDefault();
      });
    }
  }

  // Función para mostrar el formulario de modificación de menú
  showModifyMenuForm(menus, dishes) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "modify-menu";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Modificar Menu</h1>'
    );

    // Crear un formulario
    const form = document.createElement("form");
    form.name = "fModifyMenu";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    // Insertar el select de menús disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npMenus">Menus Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npMenus"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npMenus" id="npMenus">
          <option disabled selected>Selecciona un plato</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Menu</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar los menús al select de menús
    const npMenus = form.querySelector("#npMenus");
    for (const menu of menus) {
      npMenus.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    // Insertar el select de platos disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npDishes">Platos Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npDishes"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npDishes" id="npDishes">
          <option disabled selected>Selecciona un plato</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Plato</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar los platos al select de platos
    const npDishes = form.querySelector("#npDishes");
    for (const dish of dishes) {
      npDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    // Insertar los botones de enviar y cancelar
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
      <button class="btn btn-primary" type="submit">Insertar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );

    // Agregar el formulario al contenedor
    container.append(form);
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar los selectores del formulario de modificación de menú
  bindModifyMenuSelects(handler) {
    console.log("bind");
    modifyValidationForm(handler);
    console.log("valida");
  }

  // Función para mostrar el formulario de modificación (desasignar) de menú
  showModifyMenuDesasigForm(menus, dishes) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "modify-menu";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Modificar Menu (Desasignar)</h1>'
    );

    // Crear un formulario
    const form = document.createElement("form");
    form.name = "fModifyMenuDesasig";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    // Insertar el select de menús disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npMenus">Menus Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npMenus"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npMenus" id="npMenus">
          <option disabled selected>Selecciona un plato</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Menu</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar los menús al select de menús
    const npMenus = form.querySelector("#npMenus");
    for (const menu of menus) {
      npMenus.insertAdjacentHTML(
        "beforeend",
        `<option value="${menu.menu.name}">${menu.menu.name}</option>`
      );
    }

    // Insertar el select de platos disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npDishes">Platos Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npDishes"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npDishes" id="npDishes">
          <option disabled selected>Selecciona un plato</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Plato</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar los platos al select de platos
    const npDishes = form.querySelector("#npDishes");
    for (const dish of dishes) {
      npDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    // Insertar los botones de enviar y cancelar
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
      <button class="btn btn-primary" type="submit">Insertar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );

    // Agregar el formulario al contenedor
    container.append(form);
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar los selectores del formulario de modificación (desasignar) de menú
  bindModifyMenuDesasigSelects(handler) {
    console.log("bind");
    modifyDesasigValidationForm(handler);
    console.log("valida");
  }

  // Función para mostrar el formulario de creación de un nuevo restaurante
  showNewRestaurantForm() {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo Restaurante</h1>'
    );

    // Insertar el formulario HTML
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewRestaurant" role="form" class="row g-3" novalidate>
      <div class="col-md-6 mb-3">
        <label class="form-label" for="npName">Nombre *</label>
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-type"></i></span>
          <input type="text" class="form-control" id="npName"
            name="npName"
            placeholder="Nombre del Restaurante" value="" required>
          <div class="invalid-feedback">El título es obligatorio.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>
      </div>
      <!-- Otros campos del formulario -->
      <div class="mb-12">
        <button class="btn btn-primary" type="submit">Enviar</button>
        <button class="btn btn-primary" type="reset">Cancelar</button>
      </div>
    </form>`
    );

    // Agregar el formulario al contenedor 'centro'
    this.centro.append(container);
  }

  // Función para enlazar el formulario de creación de un nuevo restaurante
  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  // Función para mostrar el formulario de asignación de categorías
  showAssingCategoryForm(categories, dishes) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "assing-category";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Actualización de Categorias</h1>'
    );

    // Crear el formulario HTML
    const form = document.createElement("form");
    form.name = "fAssingCategory";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    // Insertar el select de categorías disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npCategories">Categorias Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npCategories" id="npCategories">
          <option disabled selected>Selecciona una Categoria</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Menu</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar las categorías al select de categorías
    const npCategories = form.querySelector("#npCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    // Insertar el select de platos disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npDishes">Platos Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npDishes"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npDishes" id="npDishes">
          <option disabled selected>Selecciona un plato</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Plato</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar los platos al select de platos
    const npDishes = form.querySelector("#npDishes");
    for (const dish of dishes) {
      npDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    // Insertar los botones de enviar y cancelar
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
      <button class="btn btn-primary" type="submit">Insertar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );

    // Agregar el formulario al contenedor
    container.append(form);
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar los selectores del formulario de asignación de categorías
  bindAssingCategorySelects(handler) {
    console.log("bindAssing");
    assingCategoryValidationForm(handler);
    console.log("validaAssing");
  }

  // Función para mostrar el formulario de desasignación de categorías
  showDesasigCategoryForm(categories, dishes) {
    // Reemplazar los hijos del contenedor 'centro'
    this.centro.replaceChildren();
    // Verificar si hay más de un hijo en 'centro' y eliminarlo si es el caso
    if (this.centro.children.length > 1) this.centro.children[1].remove();

    // Crear un contenedor div para el formulario
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "desasig-category";

    // Insertar el título del formulario
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Desasignar Categorias</h1>'
    );

    // Crear el formulario HTML
    const form = document.createElement("form");
    form.name = "fDesasigCategory";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    // Insertar el select de categorías disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npCategories">Categorias Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npCategories" id="npCategories">
          <option disabled selected>Selecciona una Categoria</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Menu</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar las categorías al select de categorías
    const npCategories = form.querySelector("#npCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    // Insertar el select de platos disponibles
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
      <label class="form-label" for="npDishes">Platos Disponibles</label>
      <div class="input-group">
        <label class="input-group-text" for="npDishes"><i class="bi bi-card-checklist"></i></label>
        <select class="form-select" name="npDishes" id="npDishes">
          <option disabled selected>Selecciona un plato</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un Plato</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
    </div>`
    );
    // Agregar los platos al select de platos
    const npDishes = form.querySelector("#npDishes");
    for (const dish of dishes) {
      npDishes.insertAdjacentHTML(
        "beforeend",
        `<option value="${dish.dish.name}">${dish.dish.name}</option>`
      );
    }

    // Insertar los botones de enviar y cancelar
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
      <button class="btn btn-primary" type="submit">Insertar</button>
      <button class="btn btn-primary" type="reset">Cancelar</button>
    </div>`
    );

    // Agregar el formulario al contenedor
    container.append(form);
    // Agregar el contenedor al 'centro'
    this.centro.append(container);
  }

  // Función para enlazar los selectores del formulario de desasignación de categorías
  bindDesasigCategorySelects(handler) {
    console.log("bindDesasig");
    desasigCategoryValidationForm(handler);
    console.log("validaDesasig");
  }

  // Método para mostrar un mensaje de cookies
  showCookiesMessage() {
    // Plantilla de mensaje de cookies
    const toast = `<div class="fixed-top p-5 mt-5">
    <div id="cookies-message" class="toast fade show bg-dark text-white
    w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
    <h4 class="me-auto">Aviso de uso de cookies</h4>
    <button type="button" class="btn-close" data-bs-dismiss="toast"
    aria-label="Close" id="btnDismissCookie"></button>
    </div>
    <div class="toast-body p-4 d-flex flex-column">
    <p>
    Este sitio web almacena datos en cookies para activar su
    funcionalidad, entre las que se encuentra
    datos analíticos y personalización. Para poder utilizar este
    sitio, estás automáticamente aceptando
    que
    utilizamos cookies.
    </p>
    <div class="ml-auto">
    <button type="button" class="btn btn-outline-light mr-3 deny"
    id="btnDenyCookie" data-bs-dismiss="toast">
    Denegar
    </button>
    <button type="button" class="btn btn-primary"
    id="btnAcceptCookie" data-bs-dismiss="toast">
    Aceptar
    </button>
    </div>
    </div>
    </div>
    </div>`;
    // Inserta el mensaje de cookies en el cuerpo del documento
    document.body.insertAdjacentHTML("afterbegin", toast);

    // Obtener el elemento del mensaje de cookies
    const cookiesMessage = document.getElementById("cookies-message");
    // Escuchar el evento de ocultar el mensaje de cookies
    cookiesMessage.addEventListener("hidden.bs.toast", (event) => {
      // Eliminar el mensaje de cookies cuando se oculta
      event.currentTarget.parentElement.remove();
    });

    // Obtener el botón de aceptar cookies
    const btnAcceptCookie = document.getElementById("btnAcceptCookie");
    // Escuchar el evento de hacer clic en el botón de aceptar cookies
    btnAcceptCookie.addEventListener("click", (event) => {
      // Establecer una cookie indicando que el mensaje de cookies ha sido aceptado
      setCookie("acceptedCookieMessage", "true", 1);
    });

    // Función para denegar el uso de cookies
    const denyCookieFunction = (event) => {
      // Eliminar contenido y elementos de la página
      this.main.replaceChildren();
      this.main.insertAdjacentHTML(
        "afterbegin",
        `<div class="container my3"><div class="alert alert-warning" role="alert">
      <strong>Para utilizar esta web es necesario aceptar el uso de
      cookies. Debe recargar la página y aceptar las condiciones para seguir
      navegando. Gracias.</strong>
      </div></div>`
      );
      this.categories.remove();
      this.menu.remove();
    };

    // Obtener el botón de denegar cookies
    const btnDenyCookie = document.getElementById("btnDenyCookie");
    // Escuchar el evento de hacer clic en el botón de denegar cookies
    btnDenyCookie.addEventListener("click", denyCookieFunction);
    // Obtener el botón de cerrar el mensaje de cookies
    const btnDismissCookie = document.getElementById("btnDismissCookie");
    // Escuchar el evento de hacer clic en el botón de cerrar el mensaje de cookies
    btnDismissCookie.addEventListener("click", denyCookieFunction);
  }

  // Método para mostrar un enlace de identificación
  showIdentificationLink() {
    // Obtener el área de usuario
    const userArea = document.getElementById("userArea");
    // Limpiar el área de usuario
    userArea.replaceChildren();
    // Insertar el enlace de identificación en el área de usuario
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="account d-flex
  mx-2 flex-column" style="text-align: right; height: 40px">
  <a id="login" href="#"><i class="bi bi-person-circle" aria-hidden="true"></i> Identifícate</a>
  </div>`
    );
  }

  // Método para enlazar la funcionalidad de identificación
  bindIdentificationLink(handler) {
    // Obtener el enlace de identificación
    const login = document.getElementById("login");
    // Escuchar el evento de hacer clic en el enlace de identificación
    login.addEventListener("click", (event) => {
      // Ejecutar el controlador proporcionado con los argumentos adecuados
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "main",
        { action: "login" },
        "#",
        event
      );
    });
  }

  // Método para mostrar el formulario de inicio de sesión
  showLogin() {
    // Limpiar el área central
    this.centro.replaceChildren();
    // Plantilla de formulario de inicio de sesión
    const login = `<div class="container h-100">
    <div class="d-flex justify-content-center h-100">
    <div class="user_card">
    <div class="d-flex justify-content-center form_container">
    <form name="fLogin" role="form" novalidate>
    <div class="input-group mb-3">
    <div class="input-group-append">
    <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
    </div>
    <input type="text" name="username" class="form-control
    input_user" value="" placeholder="Usuario">
    </div>
    <div class="input-group mb-2">
    <div class="input-group-append">
    <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
    </div>
    <input type="password" name="password" class="form-control
    input_pass" value="" placeholder="Contraseña">
    </div>
    <div class="form-group">
    <div class="custom-control custom-checkbox">
    <input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
    <label class="custom-control-label"
    for="customControlInline">Recuérdame</label>
    </div>
    </div>
    <div class="d-flex justify-content-center mt-3
    login_container">
    <button class="btn login_btn"
    type="submit">Acceder</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </div>`;
    // Insertar el formulario de inicio de sesión en el área central
    this.centro.insertAdjacentHTML("afterbegin", login);
  }

  // Método para enlazar la funcionalidad de inicio de sesión
  bindLogin(handler) {
    // Obtener el formulario de inicio de sesión
    const form = document.forms.fLogin;
    // Escuchar el evento de enviar el formulario
    form.addEventListener("submit", (event) => {
      // Ejecutar el controlador proporcionado con los datos del formulario
      handler(form.username.value, form.password.value, form.remember.checked);
      // Prevenir el comportamiento predeterminado de envío del formulario
      event.preventDefault();
    });
  }

  // Método para mostrar un mensaje de usuario no válido
  showInvalidUserMessage() {
    // Insertar un mensaje de usuario no válido en el área central
    this.centro.insertAdjacentHTML(
      "beforeend",
      `<div class="container my3"><div class="alert alert-warning" role="alert">
  <strong>El usuario y la contraseña no son válidos. Inténtelo
  nuevamente.</strong>
  </div></div>`
    );
    // Restablecer el formulario de inicio de sesión y enfocar el campo de usuario
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus();
  }

  // Método para inicializar el historial del navegador
  initHistory() {
    // Reemplazar el estado actual del historial con un nuevo estado inicial
    history.replaceState({ action: "init" }, null);
  }

  // Método para mostrar el perfil de usuario autenticado
  showAuthUserProfile(user) {
    // Obtener el área de usuario
    const userArea = document.getElementById("userArea");
    // Limpiar el área de usuario
    userArea.replaceChildren();
    // Insertar el perfil de usuario autenticado en el área de usuario
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="d-flex justify-content-between mx-2">
      <div class="account flex-grow-1">
        ${user.username} <a id="aCloseSession" href="#">Cerrar sesión</a>
      </div>
      <div class="image">
        <img alt="${user.username}" src="imagen/user.jpeg" />
      </div>
    </div>`
    );
  }

  // Método para establecer una cookie de usuario
  setUserCookie(user) {
    // Establecer una cookie con el nombre de usuario activo
    setCookie("activeUser", user.username, 1);
  }

  // Método para eliminar la cookie de usuario
  deleteUserCookie() {
    // Eliminar la cookie de usuario activo
    setCookie("activeUser", "", 0);
  }

  // Método para eliminar el menú de administrador
  removeAdminMenu() {
    // Obtener el menú de administrador
    const adminMenu = document.getElementById("navServices");
    // Si existe el menú de administrador, eliminar su elemento padre
    if (adminMenu) adminMenu.parentElement.remove();
  }

  // Método para enlazar la funcionalidad de cerrar sesión
  bindCloseSession(handler) {
    // Escuchar el evento de hacer clic en el enlace de cerrar sesión
    document
      .getElementById("aCloseSession")
      .addEventListener("click", (event) => {
        // Ejecutar el controlador proporcionado
        handler();
        // Prevenir el comportamiento predeterminado del enlace
        event.preventDefault();
      });
  }
}
export default ManagerView;
