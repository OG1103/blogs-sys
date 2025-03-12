import Comments from "../Models/Comments.js";
import Posts from "../Models/Posts.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body;
    const { UserId } = req.user;

    const postExists = await Posts.findByPk(postId);
    if (!postExists) {
      throw new NotFoundError("Post does not exist");
    }

    const comment = await Comments.create({
      content,
      userId: UserId,
      postId,
    });

    res.status(StatusCodes.CREATED).json({ comment });
  } catch (err) {
    next(err);
  }
};

export const getAllCommentsForPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
  
      const postExists = await Posts.findByPk(postId);
      if (!postExists) {
        throw new NotFoundError("Post does not exist");
      }
  
      const comments = await Comments.findAll({
        where: { postId },
      });
  
      res.status(StatusCodes.OK).json({ comments });
    } catch (err) {
      next(err);
    }
  };
  

export const getAllUserComments = async (req, res, next) => {
  try {
    const { UserId } = req.user;

    const comments = await Comments.findAll({
      where: { userId: UserId },
      include: [
        {
          model: Posts,
          as: "Post",
          attributes: ["title","description"],
        },
      ],
    });

    res.status(StatusCodes.OK).json({ comments });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { id: commentId } = req.params;
    const { UserId } = req.user;
    const { content } = req.body;

    const updatedFields = {};
    if (content) {
      updatedFields.content = content;
    }

    const comment = await Comments.findOne({
      where: { id: commentId, userId: UserId },
    });

    if (!comment) {
      throw new NotFoundError("Comment does not exist");
    }

    const updatedCount = await Comments.update(updatedFields, {
      where: { id: commentId, userId: UserId },
    });

    res.status(StatusCodes.OK).json({ Rows_Affected: updatedCount });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id: commentId } = req.params;
    const { UserId } = req.user;

    const deleteCount = await Comments.destroy({
      where: { id: commentId, userId: UserId },
    });

    res.status(StatusCodes.OK).json({ Rows_Affected: deleteCount });
  } catch (err) {
    next(err);
  }
};
