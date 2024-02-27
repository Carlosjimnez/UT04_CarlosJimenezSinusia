const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class ManagerView {
  constructor() {
    this.inicio = document.getElementById("inicioT"); // Cambio aquí
    this.centro = document.getElementById("centro");
    this.menuses = document.querySelector(".nav_ul");
    this.dishFileWindow = new Array();
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
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");

    li.insertAdjacentHTML(
      "beforeend",
      `<a  href="#" id="navCats" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
    );
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");
    // Insertar un enlace en el li para activar el menú desplegable de las categorías
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item"  href="#dish">${category.name}</a></li>`
      );
    }
    li.append(container);
    this.menuses.append(li);
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
    const navAller = document.getElementById("navCats");
    const links = navAller.nextSibling.querySelectorAll("a");
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
    container.id = "dishes";

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
    const list_dish = document.getElementById("dishes");
    // Obtenemos los enlaces
    const links = list_dish.querySelectorAll("a");

    // Recorremos los enlaces
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Obtenemos el nombre de nuestro plato
        const { dish } = event.currentTarget.dataset;
        console.log(dish);
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
    fileDishWindow.document.title = `${dish.dish.name}`;

    container = document.createElement("div");
    container.id = "dishFile";
    container.classList.add("dishFile");

    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="ficha" >
          <div>
            <h5>${dish.dish.name}</h5>
            <h5>Descripción</h5>
            <p>${dish.dish.description}</p>
            <h5>Ingredientes</h5>
            <p>${dish.dish.ingredients}</p>
          </div>
          <div>
            <img src=${dish.dish.image} style=" width: 18rem;
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
  showDish(dish, handler) {
    const pushButtons = document.querySelectorAll(".push-botom");

    // Agregamos el evento de clic a cada botón solo una vez
    pushButtons.forEach((button) => {
      if (!button.hasAttribute("data-clicked")) {
        button.addEventListener("click", (event) => {
          // Obtenemos el nombre del plato
          const dishName = event.currentTarget.dataset.dish;

          // Buscamos si ya existe una ventana de ficha abierta para el plato actual
          const exist = this.dishFileWindow.find(
            ({ document }) => document.title === dishName
          );

          // Verificamos si la ventana de ficha no existe o está cerrada
          if (exist == null || exist.closed) {
            // Si no existe o está cerrada, abrimos una nueva ventana de ficha
            const fileWindow = window.open(
              "fichaDishes.html",
              dishName,
              "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
            );

            // Agregamos la nueva ventana al arreglo de ventanas de fichas
            this.dishFileWindow.push(fileWindow);

            // Agregamos un evento para detectar cuando el contenido de la ventana de ficha se carga
            fileWindow.addEventListener("DOMContentLoaded", () => {
              // Ejecutamos el controlador pasando el nombre del plato y la ventana de ficha como argumentos
              handler(dishName, fileWindow);
            });
          } else {
            // Si la ventana de ficha ya está abierta, enfocamos esa ventana
            exist.focus();

            // Ejecutamos el controlador pasando el nombre del plato y la ventana de ficha existente como argumentos
            handler(dishName, exist);
          }

          // Marcamos el botón como "clickeado" para evitar que se agregue otro evento de clic
          button.setAttribute("data-clicked", true);

          // Prevenimos el comportamiento predeterminado del enlace
          event.preventDefault();
        });
      }
    });
  }
  //Muestra un enlace en la barra de navegación para cerrar todas las ventanas de fichas
  showCloseFilesWindow() {
    const li = document.createElement("li");
    li.classList.add("nav_li");
    li.insertAdjacentHTML(
      "beforeend",
      `<a id="close" href="#">Cerrar Fichas</a>`
    );
    this.menuses.append(li);
  }
  //Asignamos un evento de clic al enlace para cerrar todas las ventanas de fichas
  bindShowCloseFilesWindow(handler) {
    const closeWindow = document.getElementById("close");
    closeWindow.addEventListener("click", (event) => {
      for (const window of this.dishFileWindow) {
        window.close();
      }
      this.dishFileWindow = [];
    });
    // He añadido un evento que se dispara antes de que la página se recargue o se cierre
    window.addEventListener("beforeunload", () => {
      // Cerramos todas las ventanas de fichas antes de que la página se recargue o se cierre
      this.dishFileWindow.forEach((window) => {
        if (!window.closed) {
          window.close();
        }
      });
    });
  }
}
export default ManagerView;
