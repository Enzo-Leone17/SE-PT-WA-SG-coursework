//initialize express router
const express = require('express');
const itemRouter = express.Router();
const itemController = require('../controllers/itemController');

//endpoints
itemRouter.get('/', itemController.getAllItems);
//itemRouter.get('/:name', itemController.getItemByName);


//export
module.exports = itemRouter;