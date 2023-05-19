const { Router } = require("express");

const CommentController = require("../controllers/comment.controller");

const { verifyAuthenticate } = require("../middlewares/verifyAuthentication");

const routes = Router();

routes.get("/comments", CommentController.list);
routes.get("/comments/:id", CommentController.getById);
routes.get("/comments/movie/:id", CommentController.getByMovieId);

routes.post("/comments/movie/:id", verifyAuthenticate, CommentController.create);

routes.put("/comments/:id", verifyAuthenticate, CommentController.update);

routes.delete("/comments/:id", verifyAuthenticate, CommentController.remove);

module.exports = routes;