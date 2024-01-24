import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";
import customError from "../utils/customError.js";
import jwt from "jsonwebtoken";
import firebaseApp from "../firebase/firebaseAdmin.js";
export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const findEmail = await User.findOne({ email });

    if (findEmail) {
      return next(customError(400, "Email already Registered"));
    }
    const findUser = await User.findOne({ username });
    if (findUser) {
      return next(customError(400, "username is available"));
    }

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(customError(404, "Invalid Credentials"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(customError(404, "Invalid Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETE_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const logInWithGoogle = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);
    if (decodedToken.email) {
      const user = await User.findOne({ email: decodedToken.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE_KEY);
        const { password: pass, ...rest } = user._doc;
        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json(rest);
      } else {
        const generatePassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
        const newUser = new User({
          username:
            decodedToken.name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          email: decodedToken.email,
          password: hashedPassword,
          profilePicture: decodedToken.picture,
        });
        console.log(newUser)
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id },
          process.env.JWT_SECRETE_KEY
        );
        const { password: pass, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie("access_token", token, { httpOnly: true })
          .json(rest);
      }
    } else {
      next(
        customError(
          404,
          "Sign-in failed. Unable to retrieve email from Google."
        )
      );
    }
  } catch (error) {
    next(error);
  }
};
