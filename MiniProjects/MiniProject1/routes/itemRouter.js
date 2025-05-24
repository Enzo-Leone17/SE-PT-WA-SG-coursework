//initialize express router
import express from "express";
const itemRouter = express.Router();
import itemController from "../controllers/itemController.js";

//endpoints
//load all items + update json (long process)
itemRouter.get('/', itemController.getAllItems);

//load data from catergory
itemRouter.get('/warframe/', itemController.getWarframes);
itemRouter.get('/weapon/', itemController.getWeapons);
itemRouter.get('/mod/', itemController.getMods);
itemRouter.get('/relic/', itemController.getRelics);

//search for specific items
itemRouter.get('/warframe/search/:name', itemController.getWarframeByName);
itemRouter.get('/weapon/search/:name', itemController.getWeaponByName);
itemRouter.get('/mod/search/:name', itemController.getModByName);
itemRouter.get('/relic/search/:name', itemController.getRelicByName);



export default itemRouter;