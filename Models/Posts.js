import { DataTypes } from "sequelize";
import { sequelize } from "../Db/connect.js";

const Posts = sequelize.define(
  "Posts",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
export default Posts;
