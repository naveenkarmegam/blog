import User from "../model/user.model.js";
import customError from "../utils/customError.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(customError(403, "You are not allowed to update this user"));
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(customError(400, "Password must be at least 6 characters"));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          customError(400, "Username must be between 7 and 20 characters")
        );
      }
      if (req.body.username.includes(" ")) {
        return next(customError(400, "Username cannot contain spaces"));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(customError(400, "Username must be lowercase"));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          customError(400, "Username can only contain letters and numbers")
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      {
        new: true,
      }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(customError(403, "You are not allowed to delete this user"));
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "your account successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection =  req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({
        createdAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUser = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDay()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users:usersWithoutPassword,
      totalUser,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
