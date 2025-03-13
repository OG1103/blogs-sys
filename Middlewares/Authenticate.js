import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
export default (req, res, next) => {
  try {
    console.log("token",req.cookies.token);
    
    const token = req.cookies.token;
    if (!token) {
      return next(new UnauthenticatedError("Authorization Token is not Provided"));
      
    }

    const payLoad = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { UserId: payLoad.userId, name: payLoad.name, email: payLoad.email };
    next();

  } catch (err) {
    next(new UnauthenticatedError("Authorization Token Invalid or Expired"));
  }
};
