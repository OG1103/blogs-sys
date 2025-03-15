import { DataTypes } from "sequelize";
import { sequelize } from "../Db/connect.js";

const Users = sequelize.define(
  "Users",
  {
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    verified:{
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    timestamps: true,
  }
);

export default Users;
