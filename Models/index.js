import Users from "./User.js";
import Posts from "./Posts.js";
import Comments from "./Comments.js";

// Define Relationships
Users.hasMany(Posts, { foreignKey: "userId", as: "Posts", onDelete: "CASCADE" });
Posts.belongsTo(Users, { foreignKey: "userId", as: "User", onDelete: "CASCADE" });

Users.hasMany(Comments, { foreignKey: "userId", as: "Comments", onDelete: "CASCADE" });
Comments.belongsTo(Users, { foreignKey: "userId", as: "User", onDelete: "CASCADE" });

Posts.hasMany(Comments, { foreignKey: "postId", as: "Comments", onDelete: "CASCADE" });
Comments.belongsTo(Posts, { foreignKey: "postId", as: "Post", onDelete: "CASCADE" });

// Add models to Sequelize instance
const models = {
  Users,
  Posts,
  Comments,
};

export default models; // Export models for usage
