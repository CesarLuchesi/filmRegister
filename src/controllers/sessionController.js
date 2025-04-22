import {
  getAllSessionsService,
  getSessionByIdService,
  createSessionService,
  updateSessionService,
  deleteSessionService,
  getSessionsByFilmService,
  getSessionsByCineIdService,
} from "../models/sessionModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createSession = async (req, res, next) => {
  const { cine_id, film_id, day_week, time } = req.body;
  try {
    const newSession = await createSessionService(
      cine_id,
      film_id,
      day_week,
      time
    );
    handleResponse(res, 201, "Session created successfully", newSession);
  } catch (err) {
    next(err);
  }
};

export const getAllSessions = async (req, res, next) => {
  try {
    const sessions = await getAllSessionsService();
    handleResponse(res, 200, "Sessions retrieved successfully", sessions);
  } catch (err) {
    next(err);
  }
};

export const getSessionById = async (req, res, next) => {
  try {
    const session = await getSessionByIdService(req.params.id);
    if (!session) {
      return handleResponse(res, 404, "Session not found");
    }
    handleResponse(res, 200, "Session retrieved successfully", session);
  } catch (err) {
    next(err);
  }
};

export const updateSession = async (req, res, next) => {
  const { cine_id, film_id, day_week, time } = req.body;
  try {
    const updatedSession = await updateSessionService(
      cine_id,
      film_id,
      day_week,
      time,
      req.params.id
    );
    if (!updatedSession) {
      return handleResponse(res, 404, "Session not found");
    }
    handleResponse(res, 200, "Session updated successfully", updatedSession);
  } catch (err) {
    next(err);
  }
};

export const deleteSession = async (req, res, next) => {
  try {
    const deletedSession = await deleteSessionService(req.params.id);
    if (!deletedSession) {
      return handleResponse(res, 404, "Session not found");
    }
    handleResponse(res, 200, "Session deleted successfully", deletedSession);
  } catch (err) {
    next(err);
  }
};

export const getSessionsByCineId = async (req, res, next) => {
  try {
    const sessions = await getSessionsByCineIdService(req.params.cine_id);
    handleResponse(res, 200, "Sessions retrieved successfully", sessions);
  } catch (err) {
    next(err);
  }
};

export const getSessionsByFilmId = async (req, res, next) => {
  try {
    const sessions = await getSessionsByFilmService(req.params.film_id);
    if (sessions.length === 0) {
      return handleResponse(res, 404, "No sessions found for this film");
    }
    handleResponse(res, 200, "Sessions retrieved successfully", sessions);
  } catch (err) {
    next(err);
  }
};
