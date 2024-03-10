import RestaurantsManager from "./scriptRestaurantManager.js";
import ManagerController from "./managerController.js";
import ManagerView from "./managerView.js";
import AuthenticationService from "./authentication.js";

const ManagerAplication = new ManagerController(
  RestaurantsManager.getInstance(),
  new ManagerView(),
  AuthenticationService.getInstance()
);
export { ManagerAplication };
