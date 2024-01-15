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