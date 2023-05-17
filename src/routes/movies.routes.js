const { Router } = require("express");

const moviesController = require("../controllers/movies.controller");

const userAuthenticated = require("../middlewares/userAuthenticated");
const verifyUserRole = require("../middlewares/verifyUserRole");

const routes = Router();

routes.get("/movies", moviesController.list);
routes.get("/movies/:id", userAuthenticated, moviesController.getById);

routes.post("/movies", verifyUserRole, moviesController.create);

routes.put("/movies/:id", moviesController.update);

routes.delete("/movies/:id", moviesController.remove);

module.exports = routes;
