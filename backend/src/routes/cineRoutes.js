import express from "express";
import {
  createCine,
  deleteCine,
  getAllCines,
  getCineById,
  updateCine,
} from "../controllers/cineController.js";
import validateCine from "../middlewares/inputValidator.js";

const router = express.Router();

router.get("/cines", getAllCines);
router.get("/cine/:id", getCineById);
router.post("/cine", validateCine, createCine);
router.put("/cine/:id", validateCine, updateCine);
router.delete("/cine/:id", deleteCine);

export default router;
