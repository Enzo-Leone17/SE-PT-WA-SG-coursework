//initialize express router
import express from "express";
const accountRouter = express.Router();
import accountController from "../controllers/accountController.js";

//endpoints
accountRouter.get('/', accountController.guestLogin);
accountRouter.get('/create_account/', accountController.register);
accountRouter.get('/login/', accountController.accountLogin);



export default accountRouter;