import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Users from "../Models/User.js";
import bcrypt from "bcrypt";
import { ConflictUserError } from "../errors/index.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email: email } });

    if (existingUser) {
      throw new ConflictUserError("Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(hashedPassword);

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const payLoad = { userId: newUser.id, name: `${newUser.firstName} ${newUser.lastName}`, email: newUser.email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });

    res.status(StatusCodes.CREATED).json({ Msg: "Usert Created", User: newUser, Token: token });
  } catch (err) {
    next(err);
  }
};
