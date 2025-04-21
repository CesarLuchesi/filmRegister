import express from "express";
import {
  createFilm,
  deleteFilm,
  getAllFilms,
  getFilmById,
  updateFilm,
} from "../controllers/filmController.js";
import validateFilm from "../middlewares/filmValidator.js";

const router = express.Router();

router.get("/films", getAllFilms);
router.get("/films/:id", getFilmById);
router.post("/films", validateFilm, createFilm);
router.put("/films/:id", validateFilm, updateFilm);
router.delete("/films/:id", deleteFilm);

export default router;
