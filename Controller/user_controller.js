import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import { StatusCodes } from "http-status-codes";
import Users from "../Models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  ConflictUserError,
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} from "../errors/index.js";

// Configure AWS SDK
AWS.config.update({ region: process.env.AWS_REGION });
const cognito = new AWS.CognitoIdentityServiceProvider();

function calculateSecretHash(username, clientId, clientSecret) {
  return crypto
    .createHmac("SHA256", clientSecret)
    .update(username + clientId)
    .digest("base64");
}

export const getUser = async (req, res, next) => {
  try {
    console.log("Fetching User");

    const { UserId } = req.user;

    console.log(UserId);
    const user = await Users.findOne({
      where: { id: UserId },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new NotFoundError("User Not Found");
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const clientId = process.env.COGNITO_APP_CLIENT_ID;
    const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;
    const secretHash = calculateSecretHash(email, clientId, clientSecret);

    // Register user in Cognito
    const params = {
      ClientId: clientId,
      Username: email,
      Password: password,
      SecretHash: secretHash,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "given_name", Value: firstName },
        { Name: "family_name", Value: lastName },
      ],
    };

    const cognitoResponse = await cognito.signUp(params).promise();
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
    if (err.code === "UsernameExistsException") {
      next(new ConflictUserError("Email Already Exists"));
    } else if (err.code === "InvalidParameterException") {
      next(new BadRequestError("Invalid input parameters"));
    } else if (err.code === "InvalidPasswordException") {
      next(new BadRequestError("Password does not meet requirements"));
    } else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const clientId = process.env.COGNITO_APP_CLIENT_ID; // Define clientId
    const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;
    const secretHash = calculateSecretHash(email, clientId, clientSecret);
    // Authenticate the user with Cognito
    const params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    };

    // Send the authentication request to Cognito
    const cognitoResponse = await cognito.initiateAuth(params).promise();

    const user = await Users.findOne({ where: { email: email } });

    const payload = {
      UserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "Logged in successfully", user, token });
  } catch (err) {
    if (err.code === "UserNotFoundException") {
      next(new NotFoundError("User Doesn't Exist"));
    } else if (err.code === "NotAuthorizedException") {
      next(new UnauthenticatedError("Invalid email or password"));
    } else if (err.code === "InvalidParameterException") {
      next(new BadRequestError("Invalid input parameters"));
    } else {
      next(err);
    }
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;
    if(!email || !verificationCode){
      throw new NotFoundError("Missing verfication details");
    }
    const clientId = process.env.COGNITO_APP_CLIENT_ID; 
    const clientSecret = process.env.COGNITO_APP_CLIENT_SECRET;
    const secretHash = calculateSecretHash(email, clientId, clientSecret);

    const params = {
      ClientId: clientId,
      Username: email, 
      ConfirmationCode: verificationCode,
      SecretHash: secretHash,
    };

    await cognito.confirmSignUp(params).promise();

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("User not found in the database.");
    }

    user.verified = true;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Email verified successfully!" });
  } catch (error) {
    if (error.code === "CodeMismatchException") {
      next(new BadRequestError("Invalid verification code."));
    } else if (error.code === "ExpiredCodeException") {
      next(new BadRequestError("Verification code has expired."));
    } else if (error.code === "UserNotFoundException") {
      next(new BadRequestError("User not found."));
    } else {
      next(error);
    }
  }
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");

  res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};
