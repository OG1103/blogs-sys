import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import Users from "../Models/User.js";
import bcrypt from "bcrypt";
import { ConflictUserError, NotFoundError,UnauthenticatedError } from "../errors/index.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await Users.findOne({ where: { email: email } });

    if (existingUser) {
      throw new ConflictUserError("Email Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ Msg: "Usert Created", User: newUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      throw new NotFoundError("User Doesn't Exist");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new NotFoundError("Invalid Password");
    }

    const payload = {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`, 
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
      domain: process.env.COOKIE_DOMAIN || "localhost",
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
    });

    res.status(200).json({ message: "Logged in successfully" , user});
  } catch (err) {
    next(err);
  }
};

