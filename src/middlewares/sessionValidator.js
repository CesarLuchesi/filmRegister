import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const sessionSchema = Joi.object({
    cine_id: Joi.string().required(),
    film_id: Joi.string().required(),
    day_week: Joi.string()
      .valid("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo")
      .required(),
    time: Joi.string()
        .pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
            "string.pattern.name": "Time must be in HH:MM format (24h)",
            "string.empty": "Time is required",
        }),
});

const validateSession = (req, res, next) => {
  const { error } = sessionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

export default validateSession;
