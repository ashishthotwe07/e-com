import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
class UserController {
  register = asyncHandler(async (req, res) => {
    // Get the email from req.body
    const email = req.body.email;

    // With the help of email, find if the user exists
    const findUser = await User.findOne({ email });

    if (!findUser) {
      // If user not found, create a new user
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } else {
      throw new Error("User already exists");
    }
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updatedUser = await User.findByIdAndUpdate(
        findUser.id,
        { refreshToken },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

  updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });
  // get all user

  getAllUsers = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });

  getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const getaUser = await User.findById(id);
      res.json({ getaUser });
    } catch (error) {
      throw new Error(error);
    }
  });

  deleteAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({ deleteaUser });
    } catch (error) {
      throw new Error(error);
    }
  });
  // Add more controller methods as needed...
}

export default new UserController();
