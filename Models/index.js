import Users from "./User.js";
import Posts from "./Posts.js";
import Comments from "./Comments.js";

// Define Relationships
Users.hasMany(Posts, { foreignKey: "userId", as: "Posts" });
Posts.belongsTo(Users, { foreignKey: "userId", as: "User" });

Users.hasMany(Comments, { foreignKey: "userId", as: "Comments" });
Comments.belongsTo(Users, { foreignKey: "userId", as: "User" });

Posts.hasMany(Comments, { foreignKey: "postId", as: "Comments" });
Comments.belongsTo(Posts, { foreignKey: "postId", as: "Post" });

// Add models to Sequelize instance
const models = {
  Users,
  Posts,
  Comments,
};

export default models; // Export models for usage
