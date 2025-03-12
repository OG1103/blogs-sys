import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
// Create a Sequelize instance
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});
// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected To DB");
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default connectDB;
