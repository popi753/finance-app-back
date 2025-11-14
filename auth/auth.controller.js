const {Router} = require("express");
const authRouter = Router();

const {registerMiddleware, loginMiddleware, profileMiddleware} = require("./auth.middlewares.js");


const authService = require("./auth.service.js");

authRouter.post("/register",    registerMiddleware,     authService.register);

authRouter.post("/login",       loginMiddleware,        authService.login);

authRouter.get("/profile",      profileMiddleware,      authService.profile);


module.exports = authRouter;