function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}
function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function newCategoryValidation(handler) {
  // Obtiene el formulario de nueva categoría
  const form = document.forms.fNewCategory;
  form.setAttribute("novalidate", true);

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // Validación de campos
    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncUrl, false);
      firstInvalidElement = this.ncUrl;
    } else {
      showFeedBack(this.ncUrl, true);
    }

    if (!this.ncTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncTitle, false);
      firstInvalidElement = this.ncTitle;
    } else {
      showFeedBack(this.ncTitle, true);
    }

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Ejecuta el controlador con los datos del formulario
      handler(this.ncTitle.value, this.ncUrl.value, this.ncDescription.value);
    }

    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback,div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncTitle.focus();
  });

  // Agrega validación al cambio de los elementos del formulario
  form.ncTitle.addEventListener("change", defaultCheckElement);
  form.ncUrl.addEventListener("change", defaultCheckElement);
}

function newDishValidation(handler) {
  // Obtiene el formulario de nuevo plato
  const form = document.forms.fNewDish;
  form.setAttribute("novalidate", "");

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // Validación de campos
    if (!this.npCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.npCategories, false);
      firstInvalidElement = this.npCategories;
    } else {
      showFeedBack(this.npCategories, true);
    }

    // Validación de campos
    if (!this.npAlergens.checkValidity()) {
      isValid = false;
      showFeedBack(this.npAlergens, false);
      firstInvalidElement = this.npAlergens;
    } else {
      showFeedBack(this.npAlergens, true);
    }

    // Validación de campos
    if (!this.npUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.npUrl, false);
      firstInvalidElement = this.npUrl;
    } else {
      showFeedBack(this.npUrl, true);
    }

    // Validación de campos
    if (!this.npIngre.checkValidity()) {
      isValid = false;
      showFeedBack(this.npIngre, false);
      firstInvalidElement = this.npIngre;
    } else {
      showFeedBack(this.npIngre, true);
    }

    // Validación de campos
    if (!this.npDesc.checkValidity()) {
      isValid = false;
      showFeedBack(this.npDesc, false);
      firstInvalidElement = this.npDesc;
    } else {
      showFeedBack(this.npDesc, true);
    }

    // Validación de campos
    if (!this.npName.checkValidity()) {
      isValid = false;
      showFeedBack(this.npName, false);
      firstInvalidElement = this.npName;
    } else {
      showFeedBack(this.npName, true);
    }

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Ejecuta el controlador con los datos del formulario
      const categories = [...this.npCategories.selectedOptions].map(
        (option) => option.value
      );
      const allergens = [...this.npAlergens.selectedOptions].map(
        (option) => option.value
      );
      handler(
        this.npName.value,
        this.npDesc.value,
        this.npIngre.value,
        this.npUrl.value,
        categories,
        allergens
      );
    }

    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npName.focus();
  });

  // Agrega validación al cambio de los elementos del formulario
  form.npName.addEventListener("change", defaultCheckElement);
  form.npDesc.addEventListener("change", defaultCheckElement);
  form.npIngre.addEventListener("change", defaultCheckElement);
  form.npUrl.addEventListener("change", defaultCheckElement);
}

function modifyValidationForm(handler) {
  // Obtiene el formulario de modificación de menú
  const form = document.forms.fModifyMenu;
  form.setAttribute("novalidate", true);
  console.log("adios1");

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    console.log("adios2");

    // Validación de campos
    if (!this.npMenus.checkValidity()) {
      isValid = false;
      console.log("adios3");
      showFeedBack(this.npMenus, false);
      firstInvalidElement = this.npMenus;
    } else {
      console.log("adios4");
      showFeedBack(this.npMenus, true);
    }
    console.log("adios5");

    // Validación de campos
    if (!this.npDishes.checkValidity()) {
      isValid = false;
      console.log("adios6");
      showFeedBack(this.npDishes, false);
      firstInvalidElement = this.npDishes;
    } else {
      console.log("adios7");
      showFeedBack(this.npDishes, true);
    }
    console.log("adios8");

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
      console.log("adios9");
    } else {
      console.log("adios10");
      const dishes = [...this.npDishes.selectedOptions].map(
        (option) => option.value
      );
      console.log("adios11");
      const menus = [...this.npMenus.selectedOptions].map(
        (option) => option.value
      );
      console.log("adios12");
      console.log(menus);
      console.log(dishes);
      // Ejecuta el controlador con los datos del formulario
      handler(this.npMenus.value, this.npDishes.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npMenus.focus();
  });
}

function modifyDesasigValidationForm(handler) {
  // Obtiene el formulario de desasignación de menú
  const form = document.forms.fModifyMenuDesasig;
  form.setAttribute("novalidate", true);
  console.log("adios1");

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    console.log("adios2");

    // Validación de campos
    if (!this.npMenus.checkValidity()) {
      isValid = false;
      console.log("adios3");
      showFeedBack(this.npMenus, false);
      firstInvalidElement = this.npMenus;
    } else {
      console.log("adios4");
      showFeedBack(this.npMenus, true);
    }
    console.log("adios5");

    // Validación de campos
    if (!this.npDishes.checkValidity()) {
      isValid = false;
      console.log("adios6");
      showFeedBack(this.npDishes, false);
      firstInvalidElement = this.npDishes;
    } else {
      console.log("adios7");
      showFeedBack(this.npDishes, true);
    }
    console.log("adios8");

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
      console.log("adios9");
    } else {
      console.log("adios10");
      const dishes = [...this.npDishes.selectedOptions].map(
        (option) => option.value
      );
      console.log("adios11");
      const menus = [...this.npMenus.selectedOptions].map(
        (option) => option.value
      );
      console.log("adios12");
      console.log(menus);
      console.log(dishes);
      // Ejecuta el controlador con los datos del formulario
      handler(this.npMenus.value, this.npDishes.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npMenus.focus();
  });
}

function newRestaurantValidation(handler) {
  // Obtiene el formulario de nuevo restaurante
  const form = document.forms.fNewRestaurant;
  form.setAttribute("novalidate", true);

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // Validación de campos
    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncUrl, false);
      firstInvalidElement = this.ncUrl;
    } else {
      showFeedBack(this.ncUrl, true);
    }

    if (!this.npName.checkValidity()) {
      isValid = false;
      showFeedBack(this.npName, false);
      firstInvalidElement = this.npName;
    } else {
      showFeedBack(this.npName, true);
    }

    if (!this.ncLatitud.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncLatitud, false);
      firstInvalidElement = this.ncLatitud;
    } else {
      showFeedBack(this.ncLatitud, true);
    }

    if (!this.ncLongitud.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncLongitud, false);
      firstInvalidElement = this.ncLongitud;
    } else {
      showFeedBack(this.ncLongitud, true);
    }

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Ejecuta el controlador con los datos del formulario
      handler(
        this.npName.value,
        this.ncUrl.value,
        this.ncDescription.value,
        this.ncLatitud.value,
        this.ncLongitud.value
      );
    }

    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npName.focus();
  });

  // Agrega validación al cambio de los elementos del formulario
  form.npName.addEventListener("change", defaultCheckElement);
  form.ncUrl.addEventListener("change", defaultCheckElement);
  form.ncLatitud.addEventListener("change", defaultCheckElement);
  form.ncLongitud.addEventListener("change", defaultCheckElement);
}

function assingCategoryValidationForm(handler) {
  // Obtiene el formulario de asignación de categoría
  const form = document.forms.fAssingCategory;
  form.setAttribute("novalidate", true);
  console.log("adios1");

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    console.log("adios2");

    // Validación de campos
    if (!this.npCategories.checkValidity()) {
      isValid = false;
      console.log("adios3");
      showFeedBack(this.npCategories, false);
      firstInvalidElement = this.npCategories;
    } else {
      console.log("adios4");
      showFeedBack(this.npCategories, true);
    }
    console.log("adios5");

    // Validación de campos
    if (!this.npDishes.checkValidity()) {
      isValid = false;
      console.log("adios6");
      showFeedBack(this.npDishes, false);
      firstInvalidElement = this.npDishes;
    } else {
      console.log("adios7");
      showFeedBack(this.npDishes, true);
    }
    console.log("adios8");

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
      console.log("adios9");
    } else {
      console.log("adios10");
      const dishes = [...this.npDishes.selectedOptions].map(
        (option) => option.value
      );
      console.log("adios11");
      const categories = [...this.npCategories.selectedOptions].map(
        (option) => option.value
      );
      console.log("adios12");
      console.log(categories);
      console.log(dishes);
      // Ejecuta el controlador con los datos del formulario
      handler(this.npCategories.value, this.npDishes.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npCategories.focus();
  });
}

function desasigCategoryValidationForm(handler) {
  // Obtiene el formulario de desasignación de categoría
  const form = document.forms.fDesasigCategory;
  form.setAttribute("novalidate", true);

  // Agrega un evento de escucha para la presentación del formulario
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // Validación de campos
    if (!this.npCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.npCategories, false);
      firstInvalidElement = this.npCategories;
    } else {
      showFeedBack(this.npCategories, true);
    }

    // Validación de campos
    if (!this.npDishes.checkValidity()) {
      isValid = false;
      showFeedBack(this.npDishes, false);
      firstInvalidElement = this.npDishes;
    } else {
      showFeedBack(this.npDishes, true);
    }

    // Enfoque en el primer elemento no válido
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const dishes = [...this.npDishes.selectedOptions].map(
        (option) => option.value
      );
      const categories = [...this.npCategories.selectedOptions].map(
        (option) => option.value
      );
      console.log(categories);
      console.log(dishes);
      // Ejecuta el controlador con los datos del formulario
      handler(this.npCategories.value, this.npDishes.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  // Restablece el formulario al estado predeterminado
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npCategories.focus();
  });
}

export {
  newCategoryValidation,
  newDishValidation,
  modifyValidationForm,
  modifyDesasigValidationForm,
  newRestaurantValidation,
  assingCategoryValidationForm,
  desasigCategoryValidationForm,
};
