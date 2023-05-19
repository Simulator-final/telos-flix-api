const MovieModel = require("../model/movie.model");

const list = async (request, response) => {
  try {
    const { title, genres } = request.query;

    const query = {};

    if (title) {
      query.title = new RegExp(title, "i");
    }

    if (genres) {
      query.genres = new RegExp(genres, "i");
    }

    const movies = await MovieModel.find(query).exec();
    const count = await MovieModel.countDocuments(query);

    const pages = [];
    const limit = 10;
    for (let i = 0; i < Math.ceil(count / limit); i++) {
      const pageData = {
        page: i + 1,
        movies: movies.slice(i * limit, (i + 1) * limit)
      }
      pages.push(pageData);
    }

    return response.json({
      totalPages: pages.length,
      pages,
    });
  } catch (err) {
    return response.status(400).json({
      error: "@movies/list",
      message: err.message || "Failed to list movies",
    });
  }
};

const getById = async (request, response) => {
  const { id } = request.params;

  try {
    const movie = await MovieModel.findById(id);

    if (!movie) {
      throw new Error();
    }

    return response.json(movie);
  } catch (err) {
    return response.status(400).json({
      error: "@movies/getById",
      message: err.message || `Movie not found ${id}`,
    });
  }
};

const create = async (request, response) => {
  const { title, description, year, genres, image, video } = request.body;

  try {
    const movie = await MovieModel.create({
      title,
      description,
      year,
      genres,
      image,
      video,
    });

    return response.status(201).json(movie);
  } catch (err) {
    return response.status(400).json({
      error: "@movies/create",
      message: err.message || "Failed to create a movie",
    });
  }
};

const update = async (request, response) => {
  const { id } = request.params;
  const { title, description, year, genres, image, video } = request.body;

  try {
    const movieUpdated = await MovieModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        year,
        genres,
        image,
        video,
      },
      {
        new: true,
      }
    );

    return response.json(movieUpdated);
  } catch (error) {
    return response.status(400).json({
      error: "@movies/update",
      message: `Movie not found ${id}`,
    });
  }
};

const remove = async (request, response) => {
  const { id } = request.params;

  try {
    const movieRemoved = await MovieModel.findByIdAndDelete(id);

    if (!movieRemoved) {
      throw new Error();
    }

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({
      error: "@movies/remove",
      message: err.message || `Movie not found ${id}`,
    });
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
