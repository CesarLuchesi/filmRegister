import Joi from "joi";

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const cineSchema = Joi.object({
  cine_name: Joi.string().min(3).max(100).required(),
  city: Joi.string().min(3).max(100).required(),
  state: Joi.string()
    .length(2)
    .uppercase()
    .valid(...states)
    .required(),
});

const validateCine = (req, res, next) => {
  const { error } = cineSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next()
};

export default validateCine;
