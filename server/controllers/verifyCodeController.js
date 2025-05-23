import { LoginCode } from "../models/LoginCode.js";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import jwt from "jsonwebtoken";

const verifyLoginCode = async (req, res) => {
  const { email, code } = req.body;

  const loginCode = await LoginCode.findOne({ where: { email, code } });

  if (!loginCode || new Date() > loginCode.expiresAt) {
    throw HttpError(400, "Invalid or expired verification code");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) throw HttpError(404, "User not found");

  // Видаляємо використаний код
  await loginCode.destroy();

  // Генеруємо токен з tokenVersion
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};

export default {
  verifyLoginCode: ctrlWrapper(verifyLoginCode),
};
