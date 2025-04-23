import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const Joi = JoiBase.extend(JoiDate);

const scheduleSchema = Joi.object({
  day_week: Joi.string()
    .valid("Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo")
    .required()
    .messages({
      "any.required": "Dia da semana é obrigatório",
      "any.only": "Dia da semana deve ser: Segunda, Terça, Quarta, Quinta, Sexta, Sábado ou Domingo"
    }),
  time: Joi.string()
    .pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.pattern.base": "Horário deve estar no formato HH:MM (24h)",
      "string.empty": "Horário é obrigatório"
    })
});

const sessionSchema = Joi.object({
  cine_id: Joi.string()
    .required()
    .messages({
      "string.empty": "ID do cinema é obrigatório",
      "any.required": "ID do cinema é obrigatório"
    }),
  film_id: Joi.string()
    .required()
    .messages({
      "string.empty": "ID do filme é obrigatório",
      "any.required": "ID do filme é obrigatório"
    }),
  schedules: Joi.array()
    .items(scheduleSchema)
    .min(1)
    .required()
    .messages({
      "array.base": "Deve ser uma lista de horários",
      "array.min": "Pelo menos um horário deve ser fornecido",
      "any.required": "Horários são obrigatórios"
    })
});

export const validateCreateSession = (req, res, next) => {
  const { error } = sessionSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return res.status(400).json({ status: 400, errors });
  }
  next();
};

export const validateUpdateSession = (req, res, next) => {
  const updateSchema = sessionSchema.fork(
    ['cine_id', 'film_id', 'schedules'],
    field => field.optional()
  );

  const { error } = updateSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return res.status(400).json({ status: 400, errors });
  }
  next();
};