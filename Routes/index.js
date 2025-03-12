import Users from "./user_route.js";
import Posts from "./posts_route.js";
import Comments from "./comments_route.js";
export default (app) => {
  app.use("/api/user", Users);
  app.use("/api/post", Posts);
  app.use("/api/comment", Comments);
};
