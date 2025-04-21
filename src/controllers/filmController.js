import {
  getAllFilmsServices,
  getFilmByIdService,
  createFilmService,
  updateFilmService,
  deleteFilmService,
} from "../models/filmModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createFilm = async (req, res, next) => {
  const { film_name, gender, duration, classification, launch, synopsis } =
    req.body;
  try {
    const newFilm = await createFilmService(
      film_name,
      gender,
      duration,
      classification,
      launch,
      synopsis
    );
    handleResponse(res, 201, "Film created successfully", newFilm);
  } catch (err) {
    next(err);
  }
};

export const getAllFilms = async (req, res, next) => {
  try {
    const films = await getAllFilmsServices();
    handleResponse(res, 200, "Films retrieved successfully", films);
  } catch (err) {
    next(err);
  }
};

export const getFilmById = async (req, res, next) => {
  try {
    const film = await getFilmByIdService(req.params.id);
    if (!film) {
      return handleResponse(res, 404, "Film not found");
    }
    handleResponse(res, 200, "Film retrieved successfully", film);
  } catch (err) {
    next(err);
  }
};

export const updateFilm = async (req, res, next) => {
  const { film_name, gender, duration, classification, launch, synopsis } =
    req.body;
  try {
    const updateFilm = await updateFilmService(
      film_name,
      gender,
      duration,
      classification,
      launch,
      synopsis,
      req.params.id
    );
    if (!updateFilm) {
      return handleResponse(res, 404, "Film not found");
    }
    handleResponse(res, 200, "Film updated successfully", updateFilm);
  } catch (err) {
    next(err);
  }
};

export const deleteFilm = async (req, res, next) => {
  try {
    const deletedFilm = await deleteFilmService(req.params.id);
    if (!deletedFilm) {
      return handleResponse(res, 404, "Film not found");
    }
    handleResponse(res, 200, "Film deleted successfully", deletedFilm);
  } catch (err) {
    next(err);
  }
};
