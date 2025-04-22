import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const filmSchema = Joi.object({
  film_name: Joi.string().min(3).max(100).required(),
  gender: Joi.string().min(3).max(100).required(),
  duration: Joi.number().integer().min(1).max(999).required(),
  classification: Joi.string()
    .valid("livre", "10", "12", "14", "16", "18")
    .required(),
  launch: Joi.date().format("DD/MM/YYYY").raw().required(),
  synopsis: Joi.string().min(10).max(1000).required(),
});

const validateFilm = (req, res, next) => {
  const { error } = filmSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

export default validateFilm;
