import jwt from "jsonwebtoken";
import  customError  from "../utils/customError.js";

export const verifyAuthToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(customError(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRETE_KEY, (err, user) => {
    if (err) {
      return next(customError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
export const isAdmin = (req, res, next) => {
  const {admin}=req.user
    if(!admin){
      return next(customError(401,'you are not able to access '))
    }
    next();

};


