import NotFoundMiddleware from "../Middlewares/not-found.js";
import Authorize from "../Middlewares/Authorization.js";
import Users from "../Routes/User.js";
import Posts from "../Routes/Posts.js";
export default (app) => {
  app.use("/api/v1", Users);
  app.use("/api/v1", Authorize, Posts);
  app.use("*", NotFoundMiddleware);
};
