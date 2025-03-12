import jwt from "jsonwebtoken";
import { NotFoundError, UnauthenticatedError } from "../errors/index.js";
export default (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return next(new NotFoundError("Authorization Token is not Provided"));
    }
    const token = authHeader.split(" ")[1];

    const payLoad = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { UserId: payLoad.userId, name: payLoad.name };
    next();
  } catch (err) {
    next(new UnauthenticatedError("Authorization Token Invalid or Expired"));
  }
};
