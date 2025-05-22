//initialize express router
import express from "express";
const itemRouter = express.Router();
import itemController from "../controllers/itemController.js";

//endpoints
itemRouter.get('/', itemController.getAllItems);
itemRouter.get('/:name', itemController.getItemByName);


export default itemRouter;