import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

export default (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new UnauthenticatedError(
          "Authorization Token is not Provided or Invalid"
        )
      );
    }

    const token = authHeader.split(" ")[1]; // Extract the actual token after "Bearer"

    const payLoad = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      UserId: payLoad.UserId,
      name: payLoad.name,
      email: payLoad.email,
    };

    next();
  } catch (err) {
    next(new UnauthenticatedError("Authorization Token Invalid or Expired"));
  }
};
