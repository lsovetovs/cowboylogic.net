
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const resetPassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findByPk(userId);
  if (!user) throw HttpError(404, "User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw HttpError(401, "Old password is incorrect");

  user.password = await bcrypt.hash(newPassword, 10);
  user.tokenVersion++; // Invalidate all previous tokens
  await user.save();

  res.json({ message: "Password updated successfully" });
};

export default {
  resetPassword: ctrlWrapper(resetPassword),
};
