import {
  createCineService,
  deleteCineService,
  getAllCinesServices,
  getCineByIdService,
  updateCineService,
} from "../models/cineModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createCine = async (req, res, next) => {
  const { cine_name, city, state } = req.body;
  try {
    const newCine = await createCineService(cine_name, city, state);
    handleResponse(res, 201, "Cine created successfully", newCine);
  } catch (err) {
    next(err);
  }
};

export const getAllCines = async (req, res, next) => {
  try {
    const cines = await getAllCinesServices();
    handleResponse(res, 200, "Cines retrieved successfully", cines);
  } catch (err) {
    next(err);
  }
};

export const getCineById = async (req, res, next) => {
  try {
    const cine = await getCineByIdService(req.params.id);
    if (!cine) {
      return handleResponse(res, 404, "Cine not found");
    }
    handleResponse(res, 200, "Cine retrieved successfully", cine);
  } catch (err) {
    next(err);
  }
};

export const updateCine = async (req, res, next) => {
  const { cine_name, city, state } = req.body;
  try {
    const updatedCine = await updateCineService(
      cine_name,
      city,
      state,
      req.params.id
    );
    if (!updatedCine) {
      return handleResponse(res, 404, "Cine not found");
    }
    handleResponse(res, 200, "Cine updated successfully", updatedCine);
  } catch (err) {
    next(err);
  }
};

export const deleteCine = async (req, res, next) => {
  try {
    const deletedCine = await deleteCineService(req.params.id);
    if (!deletedCine) {
      return handleResponse(res, 404, "Cine not found");
    }
    handleResponse(res, 200, "Cine deleted successfully", deletedCine);
  } catch (err) {
    next(err);
  }
};
