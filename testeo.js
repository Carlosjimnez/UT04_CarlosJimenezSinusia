import { RestaurantsManager } from "./script.js";

function runTests() {
  const manager = RestaurantsManager.getInstance();

  const category = manager.createCategory("Pasta", "Category Principal");
  const category1 = manager.createCategory("Platos Frios", "Descripcion1");
  manager.addCategory(category);
  manager.addCategory(category1);
  console.log(manager.toString());
  manager.removeCategory(category);
  console.log(manager.toString());

  const dish = manager.createDish(
    "Macarrones",
    "Macarrones con Tomate",
    "Tomate, Pasta, Oregano",
    "dish.jpg"
  );
  const dish1 = manager.createDish(
    "Ensalada",
    "Descripcion 1.1",
    "Ingredientes 1.1",
    "dish.jpg"
  );
  const dish2 = manager.createDish(
    "Solomillo",
    "Descripcion 2",
    "Ingredientes 2",
    "dish.jpg"
  );
  manager.addDish(dish);
  manager.addDish(dish1);
  console.log(manager.toString());

  manager.assignCategoryToDish(dish, category);
  console.log(manager.toString());
  // manager.deassignCategoryToDish(category, dish);
  // console.log(manager.toString());
  const allergen = manager.createAllergen("Tomate", "Descripcion");
  const allergen1 = manager.createAllergen("Oregano", "Descripcion");
  manager.assignAllergenToDish(dish, allergen);
  manager.assignAllergenToDish(dish, allergen1);
  console.log(manager.toString());

  manager.deassignAllergenToDish(dish, allergen);
  console.log(manager.toString());

  const menu = manager.createMenu("Menu Principal", "Descripcion del Menu");

  manager.assignDishToMenu(menu, dish);
  console.log(manager.toString());

  manager.deassignDishToMenu(menu, dish);
  console.log(manager.toString());

  manager.assignDishToMenu(menu, dish);
  manager.assignDishToMenu(menu, dish1);
  manager.assignAllergenToDish(dish1, allergen1);
  console.log(manager.toString());

  manager.changeDishesPositionsInMenu(menu, dish1, dish);
  console.log(manager.toString());
  manager.assignDishToMenu(menu, dish2);
  manager.changeDishesPositionsInMenu(menu, dish2, dish);
  console.log(manager.toString());

  const dishesInCategory = manager.getDishesInCategory(category);
  console.log("Dishes en Category Principal:");
  for (const dish of dishesInCategory) {
    console.log(dish.getName());
  }
  const dishesWithAllergen = manager.getDishesWithAllergen(allergen1);
  console.log("Dishes con Allergen1:");
  for (const dish of dishesWithAllergen) {
    console.log(dish.getName());
  }

  const nameFilter = (dish) => dish.name.includes("Macarrones");
  const resultado = manager.findDishes(nameFilter);
  const resultArray = Array.from(resultado);
  console.log(resultArray.toString());

  console.log("Testeo correcto");
}

// Ejecutar pruebas
runTests();
