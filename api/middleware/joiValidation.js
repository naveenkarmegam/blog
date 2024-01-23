import customError from "../utils/customError.js";

const joiValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(customError(400,error.details[0].message))
    }
    next();
  };
};
export default joiValidation;
