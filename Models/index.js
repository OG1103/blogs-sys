import Users from "./User.js";
import Posts from "./Posts.js";

Users.hasMany(Posts, { foreignKey: "userId", as: "Posts" });
Posts.belongsTo(Users, { foreignKey: "userId", as: "User" });

// Add models to Sequelize instance
const models = {
  Users,
  Posts,
};

export default models; // Export models for usage
