import { Allergen } from "./allergen.js";
import { Menu } from "./menu.js";
import { Dish } from "./dish.js";
import { Restaurant } from "./restaurant.js";
import { Category } from "./category.js";

const RestaurantsManager = (function () {
  let initiated;

  class RestaurantsManager {
    constructor(systemName) {
      this.systemName = systemName;
      this.categories = [];
      this.allergens = [];
      this.dishes = [];
      this.menus = [];
      this.restaurants = [];
      this.instance = null;
    }
    getDishes() {
      return instance.dishes[Symbol.iterator]();
    }
    getCategories() {
      return this.categories[Symbol.iterator]();
    }

    getMenus() {
      return this.menus[Symbol.iterator]();
    }

    getAllergens() {
      return this.allergens[Symbol.iterator]();
    }

    getRestaurants() {
      return this.restaurants[Symbol.iterator]();
    }
    // Métodos para obtener la posición de un objeto en la lista

    getPositionDishes(dish) {
      return this.dishes.findIndex(
        (existingDish) => existingDish && existingDish.dish.name === dish.name
      );
    }

    getPositionCategories(category) {
      return this.categories.findIndex(
        (existingCategory) =>
          existingCategory && existingCategory.name === category.name
      );
    }

    getPositionMenus(menu) {
      return this.menus.findIndex(
        (existingMenu) => existingMenu && existingMenu.menu.name === menu.name
      );
    }

    getPositionAllergens(allergen) {
      return this.allergens.findIndex(
        (existingAllergen) =>
          existingAllergen && existingAllergen.name === allergen.name
      );
    }

    getPositionRestaurants(restaurant) {
      return this.restaurants.findIndex(
        (existingRestaurant) =>
          existingRestaurant && existingRestaurant.name === restaurant.name
      );
    }

    // Métodos para agregar y remover categorías, menús, alérgenos, platos y restaurantes

    addCategory(...categories) {
      categories.forEach((category) => {
        if (category instanceof Category) {
          let indexCategory = this.getPositionCategories(category);
          if (indexCategory === -1) {
            this.categories.push(category);
          } else {
            throw new CategoryAlreadyExistsError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this;
    }

    removeCategory(...categories) {
      categories.forEach((category) => {
        if (category instanceof Category) {
          let indexCategory = this.getPositionCategories(category);
          if (indexCategory !== -1) {
            this.categories.splice(indexCategory, 1);
          } else {
            throw new CategoryNotFoundError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this;
    }

    addMenu(...menus) {
      menus.forEach((menu) => {
        if (menu instanceof Menu) {
          let indexMenu = this.getPositionMenus(menu);
          if (indexMenu === -1) {
            this.menus.push({
              menu,
              dish: [],
            });
          } else {
            throw new MenuAlreadyExistsError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this;
    }

    removeMenu(...menus) {
      menus.forEach((menu) => {
        if (menu instanceof Menu) {
          let indexMenu = this.getPositionMenus(menu);
          if (indexMenu !== -1) {
            this.menus.splice(indexMenu, 1);
          } else {
            throw new MenuNotFoundError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this;
    }
    addAllergen(...allergens) {
      allergens.forEach((allergen) => {
        if (allergen instanceof Allergen) {
          let indexAllergen = this.getPositionAllergens(allergen);

          if (indexAllergen === -1) {
            // El alérgeno no existe, puedes agregarlo
            this.allergens.push(allergen);
          } else {
            throw new AllergenAlreadyExistsError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this; // Permite encadenar llamadas
    }

    removeAllergen(...allergens) {
      allergens.forEach((allergen) => {
        if (allergen instanceof Allergen) {
          let indexAllergen = this.getPositionAllergens(allergen);
          if (indexAllergen !== -1) {
            this.allergens.splice(indexAllergen, 1);
          } else {
            throw new AllergenNotFoundError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this;
    }

    addDish(...dishes) {
      dishes.forEach((dish) => {
        if (dish instanceof Dish) {
          let dishIndex = this.getPositionDishes(dish);

          if (dishIndex === -1) {
            // El plato no existe, puedes agregarlo
            this.dishes.push({
              dish,
              category: [],
              allergens: [],
            });
          } else {
            // El plato ya existe
            throw new DishAlreadyExistsError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this; // Permite encadenar llamadas
    }

    removeDish(...dishes) {
      dishes.forEach((dish) => {
        if (dish instanceof Dish) {
          const index = this.getPositionDishes(dish);
          if (index !== -1) {
            this.dishes.splice(index, 1);
          } else {
            throw new DishNotFoundError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this;
    }

    addRestaurant(...restaurants) {
      restaurants.forEach((restaurant) => {
        if (restaurant instanceof Restaurant) {
          let restaurantIndex = this.getPositionRestaurants(restaurant);

          if (restaurantIndex === -1) {
            // El restaurante no existe, puedes agregarlo
            this.restaurants.push(restaurant);
          } else {
            // El restaurante ya existe
            throw new RestaurantAlreadyExistsError();
          }
        } else {
          throw new InvalidObjectError();
        }
      });
      return this; // Permite encadenar llamadas
    }

    removeRestaurant(...restaurants) {
      restaurants.forEach((restaurant) => {
        if (restaurant instanceof Restaurant) {
          const index = this.getPositionRestaurants(restaurant);
          if (index !== -1) {
            this.restaurants.splice(index, 1);
          } else {
            throw new RestaurantNotFoundError();
          }
        } else {
          throw aInvalidObjectError();
        }
      });
      return this;
    }

    assignCategoryToDish(dish, ...categories) {
      if (dish instanceof Dish) {
        let dishIndex = this.getPositionDishes(dish);

        if (dishIndex === -1) {
          this.dishes.push({
            dish,
            category: [],
            allergens: [],
          });
        }

        categories.forEach((category) => {
          if (category instanceof Category) {
            let indexCategory = this.getPositionCategories(category);
            if (indexCategory === -1) {
              this.categories.push(category);
            }

            if (!this.dishes[dishIndex].category.includes(category)) {
              this.dishes[dishIndex].category.push(category);
            }
          } else {
            throw new InvalidObjectError();
          }
        });

        return this; // Permite encadenar llamadas
      } else {
        throw new InvalidObjectError();
      }
    }

    deassignCategoryFromDish(dish, ...categories) {
      if (dish instanceof Dish) {
        const dishIndex = this.getPositionDishes(dish);
        const assignedCategories = this.dishes[dishIndex]?.category;

        if (dishIndex !== -1) {
          categories.forEach((category) => {
            if (
              category instanceof Category &&
              assignedCategories.includes(category)
            ) {
              // Desasignar la categoría al plato
              const categoryPosition = assignedCategories.indexOf(category);
              assignedCategories.splice(categoryPosition, 1);
            } else {
              throw new InvalidObjectError();
            }
          });
          return this; // Permite encadenar llamadas
        }
      } else {
        throw new InvalidObjectError();
      }
    }

    assignAllergenToDish(dish, ...allergens) {
      if (dish instanceof Dish) {
        let dishIndex = this.getPositionDishes(dish);

        if (dishIndex === -1) {
          this.dishes.push({
            dish,
            category: [],
            allergens: [],
          });
        }

        allergens.forEach((allergen) => {
          if (allergen instanceof Allergen) {
            let indexAllergen = this.getPositionAllergens(allergen);

            if (indexAllergen === -1) {
              this.allergens.push(allergen);
            }

            if (!this.dishes[dishIndex].allergens.includes(allergen)) {
              this.dishes[dishIndex].allergens.push(allergen);
            }
          } else {
            throw new InvalidObjectError();
          }
        });

        return this; // Permite encadenar llamadas
      } else {
        throw new InvalidObjectError();
      }
    }

    deassignAllergenToDish(dish, ...allergens) {
      if (dish instanceof Dish) {
        const dishIndex = this.getPositionDishes(dish);
        const assignedAllergens = this.dishes[dishIndex]?.allergens;

        if (dishIndex !== -1) {
          allergens.forEach((allergen) => {
            if (
              allergen instanceof Allergen &&
              assignedAllergens.includes(allergen)
            ) {
              // Desasignar el alérgeno al plato
              const allergenPosition = assignedAllergens.indexOf(allergen);
              assignedAllergens.splice(allergenPosition, 1);
            } else {
              throw new InvalidObjectError();
            }
          });
          return this; // Permite encadenar llamadas
        }
      } else {
        throw new InvalidObjectError();
      }
    }

    assignDishToMenu(menu, ...dishes) {
      if (menu instanceof Menu) {
        // Verificar si el menú está registrado
        let indexMenu = this.getPositionMenus(menu);

        if (indexMenu === -1) {
          this.menus.push({
            menu,
            dish: [],
          });
          indexMenu = this.getPositionMenus(menu); // Obtener el nuevo índice después de agregar el menú
        }

        const assignedDishes = this.menus[indexMenu]?.dish;

        dishes.forEach((dish) => {
          if (dish instanceof Dish) {
            const dishIndex = assignedDishes.findIndex(
              (assignedDish) => assignedDish === dish
            );

            if (dishIndex === -1) {
              // Verificar si el plato ya está asignado al menú
              assignedDishes.push(dish); // Asignar el plato al menú
            } else {
              throw new MenuAlreadyExistsError();
            }
          } else {
            throw new InvalidObjectError();
          }
        });

        return this; // Permite encadenar llamadas
      } else {
        throw new InvalidObjectError();
      }
    }

    deassignDishToMenu(menu, ...dishes) {
      if (menu instanceof Menu) {
        const assignedDishes = this.menus[this.getPositionMenus(menu)]?.dish;

        dishes.forEach((dish) => {
          if (dish instanceof Dish) {
            const dishIndex = assignedDishes.indexOf(dish);

            if (dishIndex !== -1) {
              // Desasignar el plato al menú
              assignedDishes.splice(dishIndex, 1);
            } else {
              throw new InvalidObjectError();
            }
          } else {
            throw new InvalidObjectError();
          }
        });

        return this; // Permite encadenar llamadas
      } else {
        throw new InvalidObjectError();
      }
    }

    changeDishesPositionsInMenu(menu, dish1, dish2) {
      if (
        menu instanceof Menu &&
        dish1 instanceof Dish &&
        dish2 instanceof Dish
      ) {
        // Verificar si el menú está registrado
        const indexMenu = this.getPositionMenus(menu);

        if (indexMenu !== -1) {
          // Verificar si ambos platos están asignados al menú
          const assignedDishes = this.menus[indexMenu].dish;
          const dish1Index = assignedDishes.findIndex(
            (assignedDish) => assignedDish === dish1
          );
          const dish2Index = assignedDishes.findIndex(
            (assignedDish) => assignedDish === dish2
          );

          if (dish1Index !== -1 && dish2Index !== -1) {
            // Intercambiar las posiciones de los platos
            [
              this.menus[indexMenu].dish[dish1Index],
              this.menus[indexMenu].dish[dish2Index],
            ] = [
              this.menus[indexMenu].dish[dish2Index],
              this.menus[indexMenu].dish[dish1Index],
            ];
            return this; // Permite encadenar llamadas
          }
        } else {
          throw new MenuNotFoundError();
        }
      } else {
        throw new InvalidObjectError();
      }
    }

    // Métodos para obtener platos en una categoría, platos con un alérgeno y platos filtrados por una función de callback

    getDishesInCategory(category, orderFunct) {
      if (category instanceof Category) {
        // Comprobar si la categoría está registrada
        const indexCategory = this.getPositionCategories(category);

        if (indexCategory !== -1) {
          // Obtener platos asignados a la categoría
          const dishesInCategory = this.dishes.reduce((cont, dishInfo) => {
            const categoryIndex = dishInfo.category.findIndex(
              (assignedCategory) => assignedCategory === category
            );
            if (categoryIndex !== -1) {
              cont.push(dishInfo.dish);
            }
            return cont;
          }, []);

          // Ordenar si se proporciona una función de ordenación
          if (orderFunct && typeof orderFunct === "function") {
            dishesInCategory.sort(orderFunct);
          }

          return dishesInCategory[Symbol.iterator]();
        }
      } else {
        throw new InvalidObjectError();
      }
    }

    getDishesWithAllergen(allergen, orderFunct) {
      if (allergen instanceof Allergen) {
        // Comprobar si el alérgeno está registrado
        const indexAllergen = this.getPositionAllergens(allergen);

        if (indexAllergen !== -1) {
          // Obtener platos con el alérgeno
          const dishesWithAllergen = this.dishes.reduce((cont, dishInfo) => {
            const allergenIndex = dishInfo.allergens.findIndex(
              (assignedAllergen) => assignedAllergen === allergen
            );
            if (allergenIndex !== -1) {
              cont.push(dishInfo.dish);
            }
            return cont;
          }, []);

          if (orderFunct && typeof orderFunct === "function") {
            dishesWithAllergen.sort(orderFunct);
          }

          return dishesWithAllergen[Symbol.iterator]();
        }
      } else {
        throw new InvalidObjectError();
      }
    }

    findDishes(callback, orderFunct) {
      if (typeof callback === "function") {
        // Obtener platos que cumplen con el criterio
        const filteredDishes = this.dishes.reduce((cont, dishInfo) => {
          if (callback(dishInfo.dish)) {
            cont.push(dishInfo.dish);
          }
          return cont;
        }, []);

        // Ordenar si se proporciona una función de ordenación
        if (orderFunct && typeof orderFunct === "function") {
          filteredDishes.sort(orderFunct);
        }

        return filteredDishes[Symbol.iterator]();
      } else {
        throw new Error("La función de callback es inválida.");
      }
    }

    //Métodos para crear objetos de las clases Dish, Menu, Allergen, Category y Restaurant

    createDish(name, description, ingredients, image) {
      const existingDish = this.dishes.find((dish) => dish.getName() === name);

      if (existingDish) {
        return existingDish;
      } else {
        const newDish = new Dish(name, description, ingredients, image);
        return newDish;
      }
    }

    createMenu(name, description) {
      const existingMenu = this.menus.find((menu) => menu.getName() === name);

      if (existingMenu) {
        return existingMenu;
      } else {
        const newMenu = new Menu(name, description);
        return newMenu;
      }
    }

    createAllergen(name, description) {
      const existingAllergen = this.allergens.find(
        (allergen) => allergen.getName() === name
      );

      if (existingAllergen) {
        return existingAllergen;
      } else {
        const newAllergen = new Allergen(name, description);
        return newAllergen;
      }
    }

    createCategory(name, description) {
      const existingCategory = this.categories.find(
        (category) => category.getName() === name
      );

      if (existingCategory) {
        return existingCategory;
      } else {
        const newCategory = new Category(name, description);
        return newCategory;
      }
    }

    createRestaurant(name, description, location) {
      const existingRestaurant = this.restaurants.find(
        (restaurant) => restaurant.getName() === name
      );

      if (existingRestaurant) {
        return existingRestaurant;
      } else {
        const newRestaurant = new Restaurant(name, description, location);
        return newRestaurant;
      }
    }

    toString() {
      const systemInfo = `System Name: ${this.systemName}\n`;

      const categoriesInfo = this.categories.map((category) =>
        category.toString()
      );

      const allergensInfo = this.allergens.map((allergen) =>
        allergen.toString()
      );

      const dishesInfo = this.dishes.map((dish) => {
        const categories = dish.category.map((category) => category.toString());
        const allergens = dish.allergens.map((allergen) => allergen.toString());

        return `\n${dish.dish.toString()}\n-Categories: \n${categories.join(
          ", "
        )}\n-Allergens: \n${allergens.join(", ")}\n`;
      });

      const menusInfo = this.menus.map((menu) => {
        const menuDetails = `\n${menu.menu.toString()}\n-Dishes: \n${menu.dish
          .map((d) => d.toString())
          .join(", ")}`;
        return menuDetails;
      });

      const restaurantsInfo = this.restaurants.map((restaurant) =>
        restaurant.toString()
      );

      return (
        systemInfo +
        "\nCategories:" +
        "\n" +
        categoriesInfo +
        "\n\nAllergens:" +
        "\n" +
        allergensInfo +
        "\n\nDishes:" +
        "\n" +
        dishesInfo +
        "\n\nMenus:" +
        "\n" +
        menusInfo +
        "\n" +
        "\n\nRestaurants:" +
        "\n" +
        restaurantsInfo
      );
    }
  }
  // Función de inicialización para crear una instancia única de RestaurantsManager
  function init() {
    return new RestaurantsManager("Sistema de Restaurantes");
  }
  // Devolución de un objeto que expone solo el método getInstance, que garantiza que solo existe una instancia de RestaurantsManager
  return {
    getInstance: function () {
      if (!initiated) initiated = init();
      return initiated;
    },
  };
})();

export { RestaurantsManager };
