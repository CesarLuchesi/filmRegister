import express from "express";
import {
  createSession,
  deleteSession,
  getAllSessions,
  getSessionById,
  getSessionsByCineId,
  getSessionsByFilmId,
  updateSession,
} from "../controllers/sessionController.js";
import {
  validateCreateSession,
  validateUpdateSession,
} from "../middlewares/sessionValidator.js";

const router = express.Router();

router.get("/sessions", getAllSessions);
router.get("/sessions/:id", getSessionById);
router.get("/sessions/cine/:cine_id", getSessionsByCineId);
router.get("/sessions/film/:film_id", getSessionsByFilmId);
router.post("/sessions", validateCreateSession, createSession);
router.put("/sessions/:id", validateUpdateSession, updateSession);
router.delete("/sessions/:id", deleteSession);

export default router;
