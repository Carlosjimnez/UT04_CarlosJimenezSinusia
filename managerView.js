class ManagerView {
  constructor() {
    this.inicio = document.getElementById("inicioT");
    this.centro = document.getElementById("centro");
    this.menuses = document.querySelector(".nav_ul");
  }

  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });

    document.getElementById("logo").addEventListener("click", (event) => {
      handler();
    });
  }

  //Mostrará todas la categorias que tenemos en la zona que hemos marcado como centro
  showCategories(categories) {
    // Eliminamos la fila con las categorias
    if (this.centro.children.length > 0) this.centro.children[0].remove();

    // Creamos el contenedor donde irán nuestras categorias
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
                <h3>${category.name}</h3>
                <img src="${category.imagen}" alt="${category.name}" style="max-width: 100%; height: auto; text-align:center;">
            </div>
        `
      );
    }
    this.centro.append(categoryContainer);
  }
  //Este mostrará tres platos random en la zona que hemos marcado como inicio
  showRandomDishes(dishes) {
    // Eliminamos las filas
    if (this.inicio.children.length > 0) this.inicio.children[0].remove();

    // Creo un elemento div
    const container = document.createElement("div");

    container.classList.add("row");
    container.id = "random";

    container.insertAdjacentHTML(
      "beforeend",
      `
      <h2>Algunos de Nuestros Platos</h2>
      `
    );

    //Con el forEach recorremos los platos
    for (const dish of dishes) {
      //Insertamos con estilos la informacion de los platos
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div >
          <h5>${dish.dish.name}</h5>
          <img class=dish-random src="${dish.dish.image}" alt="${dish.dish.name}" ">
        </div>
        `
      );
    }

    // Insertamos el contenedor en nuestro html con el contenido de nuestros platos
    this.inicio.append(container);
  }
  // Esta función asigna los eventos
  bindRandomDishes(handler) {
    // Obtenemos el elemento donde se almacenan nuestros platos
    const randomList = document.getElementById("random");
    // Obtenemos los enlaces
    const links = randomList.querySelectorAll("a");
    // Recorremos los links
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.name);
      });
    }
  }

  // Esta función genera el menú desplegable de categorías y lo muestra en la barra de navegación
  showCategoriesInMenu(categories) {
    // Creamos un elemento li para la lista
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.classList.add("dropdown");
    li.insertAdjacentHTML(
      "beforeend",
      `<a  href="#" id="navCats" role="button"
    data-bs-toggle="dropdown" aria-expanded="false">Categorías</a>`
    );
    // Creamos un elemento ul para contener las categorías
    const container = document.createElement("ul");
    container.classList.add("dropdown-menu");

    // Iterar sobre cada categoría y la agregamos al menú desplegable
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item";>${category.name}</a></li>` // Insertar un elemento <li> para cada categoría
      );
    }
    li.append(container);
    // Agregamos el elemento li con el menú desplegable al menú de la barra de navegación
    this.menuses.append(li);
  }

  // Esta función asigna eventos de clic a las categorías en la lista de platos
  bindCategoryList(handler) {
    const categories = document.getElementById("dish-list");
    const categoryTitles = categories.querySelectorAll("h3");
    const categoryImages = categories.querySelectorAll("img");

    // Iteramos sobre las imágenes de categorías y asignamos un evento de clic a cada una
    for (const image of categoryImages) {
      image.addEventListener("click", (event) => {
        handler(event.target.parentElement.querySelector("h3").textContent); // Llamar al controlador con el texto del título de la categoría
      });
    }

    // Iteramos sobre los títulos de categorías y asignamos un evento de clic a cada uno
    for (const title of categoryTitles) {
      title.addEventListener("click", (event) => {
        handler(event.target.textContent); // Llamar al controlador con el texto del título de la categoría
      });
    }
  }

  // Esta función asigna eventos de clic a las categorías en el menú de la barra de navegación
  bindCategorysListInMenu(handler) {
    const navAller = document.getElementById("navCats"); // Obtener el elemento de menú desplegable
    const links = navAller.nextSibling.querySelectorAll("a"); // Obtener todos los enlaces dentro del menú desplegable

    // Iterar sobre los enlaces y asignar un evento de clic a cada uno
    for (const link of links) {
      link.addEventListener("click", (event) => {
        // Llamamos al controlador con el atributo de datos de la categoría seleccionada
        handler(event.currentTarget.dataset.category);
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
        `<li><a data-allergen="${allergen.name}" class="dropdown-item"> ${allergen.name}</a></li>`
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
        handler(event.currentTarget.dataset.allergen);
      });
    }
  }
  // Muestra los menús en el menú desplegable de la barra de navegación
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
        `<li><a data-menu="${menu.menu.name}" class="dropdown-item" href="#product-list">${menu.menu.name}</a></li>`
      );
    }
    li.append(container);
    this.menuses.append(li);
  }
  // Y asignamos los eventos de clic a los menús en el menú desplegable
  bindMenuList(handler) {
    const navMenu = document.getElementById("navMenu");
    const links = navMenu.nextSibling.querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.menu);
        console.log(event.currentTarget.dataset.menu);
      });
    }
  }
  // Esta función muestra los restaurantes en el menú desplegable de la barra de navegación
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
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item">${restaurant.name}</a></li>`
      );
    }
    li.append(container);
    this.menuses.append(li);
  }
  // Esta función muestra los detalles del restaurante seleccionado
  showRestaurant(restaurant) {
    //Limpiamos el contenido del centro de la página

    this.centro.replaceChildren();
    const container = document.createElement("div");
    container.classList.add("row");

    if (restaurant) {
      container.id = "restaurant";
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div>
            <div >
                <div >
                    <h2>${restaurant.name}</h2>
                    <p >${restaurant.description}</p>
                    <h5 >Localización</h5>
                    <p >${restaurant.location}</p>
                </div>
                <div>
                <img src=${restaurant.image} alt="">
            </div>
            </div>
        </div>
        `
      );
    }
    this.centro.append(container);
  }
  // Esta función asigna eventos de clic a los restaurantes en el menú desplegable
  bindRestaurant(handler) {
    const navRest = document.getElementById("navRest");
    const links = navRest.nextSibling.querySelectorAll("a");

    for (const link of links) {
      link.addEventListener("click", (event) => {
        handler(event.currentTarget.dataset.restaurant);
      });
    }
  }
  // Esta función muestra una lista de platos en el centro de la página
  listDishes(dishes, name) {
    this.centro.replaceChildren();

    const container = document.createElement("div");
    container.classList.add("row");
    container.id = "dish-list";

    container.insertAdjacentHTML("beforeend", `<h3>${name}</h3>`);
    // Iteramos sobre cada plato y agregarlo al contenedor
    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="dish-container">
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
            </div>
            `
      );
    }
    this.centro.append(container);
  }

  bindShowDish() {
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
  }
}

//Exportamos js
export default ManagerView;
//No he añadido mas comentarios porque se repite mucho código pero con distintos nombres
