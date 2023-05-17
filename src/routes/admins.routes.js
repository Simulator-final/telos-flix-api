const { Router } = require("express");

const usersController = require("../controllers/users.controller");

const verifyUserRole = require("../middlewares/verifyUserRole");

const routes = Router();

routes.post("/users/admin", verifyUserRole, usersController.create);

module.exports = routes;
