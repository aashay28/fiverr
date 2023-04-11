const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const { createError } = require("../utils/createError.js");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res
      .status(201)
      .json({ status: "success", message: "New user has been created" });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(400, "User Not Found !"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect)
      return next(createError(404, "Invalid Username or Password"));

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};
exports.logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", { sameSite: "none", secure: true })
      .status(200)
      .send("User has been logged out");
  } catch (err) {
    next(err);
  }
};
