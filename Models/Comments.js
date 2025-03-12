import { DataTypes } from "sequelize";
import { sequelize } from "../Db/connect.js";

const Comments = sequelize.define(
  "Comments",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default Comments;
