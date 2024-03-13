// Función para establecer una cookie en el navegador del usuario
function setCookie(cname, cvalue, exdays) {
  // Obtener la fecha actual
  const d = new Date();
  // Añadir el número de días especificado para la expiración de la cookie
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  // Formatear la fecha de expiración en formato UTC
  const expires = `expires=${d.toUTCString()}`;
  // Establecer la cookie en el navegador con el nombre, valor y fecha de expiración especificados
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

// Función para obtener el valor de una cookie del navegador del usuario
function getCookie(cname) {
  // Crear una expresión regular para buscar el valor de la cookie con el nombre especificado
  const re = new RegExp(`(?:(?:^|.*;\\s*)${cname}\\s*\\=\\s*([^;]*).*$)|^.*$`);
  // Utilizar la expresión regular para buscar y devolver el valor de la cookie
  return document.cookie.replace(re, "$1");
}

// Exportar las funciones para que estén disponibles fuera del módulo actual
export { setCookie, getCookie };
