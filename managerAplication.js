import RestaurantsManager from "./scriptRestaurantManager.js";
import ManagerController from "./managerController.js";
import ManagerView from "./managerView.js";
const ManagerAplication = new ManagerController(
  RestaurantsManager.getInstance(),
  new ManagerView()
);
export { ManagerAplication };
