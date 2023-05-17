const { Router } = require("express");

const moviesController = require("../controllers/movies.controller");

const { verifyAuthenticate } = require("../middlewares/verifyAuthentication");

const verifyUserRole = require("../middlewares/verifyUserRole");

const routes = Router();

routes.get("/movies", moviesController.list);
routes.get("/movies/:id", moviesController.getById);

routes.post(
  "/movies",
  verifyAuthenticate,
  verifyUserRole,
  moviesController.create
);

routes.put("/movies/:id", moviesController.update);

routes.delete("/movies/:id", moviesController.remove);

module.exports = routes;
