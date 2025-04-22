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
import validateSession from "../middlewares/sessionValidator.js";

const router = express.Router();

router.get("/sessions", getAllSessions);
router.get("/sessions/:id", getSessionById);
router.get("/sessions/cine/:cine_id", getSessionsByCineId);
router.get("/sessions/film/:film_id", getSessionsByFilmId);
router.post("/sessions", validateSession, createSession);
router.put("/sessions/:id", validateSession, updateSession);
router.delete("/sessions/:id", deleteSession);

export default router;
