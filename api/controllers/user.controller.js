const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can only delete your account"));
    }
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send("Deleted");
  } catch (err) {
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(403, "User not found"));
    }
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
