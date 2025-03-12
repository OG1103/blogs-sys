import Posts from "../Models/Posts.js";
import Users from "../Models/User.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const createPost = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { UserId } = req.user;
    const post = await Posts.create({
      title,
      description,
      userId: UserId,
    });

    console.log(req.user);

    res
      .status(StatusCodes.CREATED)
      .json({ MSG: `Post Created BY User ${req.user.name}`, post });
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: Users,
          as: "User",
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    res.status(StatusCodes.OK).json({ posts });
  } catch (err) {
    next(err);
  }
};
export const getAllUserPosts = async (req, res, next) => {
  try {
    const { UserId } = req.user;
    const posts = await Posts.findAll({
      where: { userId: UserId },
      include: [
        { model: Users, as: "User", attributes: ["firstName", "lastName"] },
      ],
    });

    res.status(StatusCodes.OK).json({ posts });
  } catch (err) {
    next(err);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { UserId } = req.user;

    const post = await Posts.findOne({ where: { id: postId, userId: UserId } });
    if (!post) {
      throw new NotFoundError("Post Doesn't exist");
    }
    res.status(StatusCodes.OK).json({ post });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { UserId } = req.user;

    const { title, description } = req.body;

    const updatedFields = {};
    if (title) {
      updatedFields.title = title;
    }
    if (description) {
      updatedFields.description = description;
    }

    const post = await Posts.findOne({ where: { id: postId, userId: UserId } });
    if (!post) {
      throw new NotFoundError("Post Doesn't exist");
    }
    const updatedCount = await Posts.update(updatedFields, {
      where: { id: postId, userId: UserId },
    });
    res.status(StatusCodes.OK).json({ Rows_Affected: updatedCount });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { UserId } = req.user;

    const deletCount = await Posts.destroy({
      where: { id: postId, userId: UserId },
    });

    res.status(StatusCodes.OK).json({ Rows_Affected: deletCount });
  } catch (err) {
    next(err);
  }
};
