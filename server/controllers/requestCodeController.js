
import LoginCode from "../models/LoginCode.js";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { sendEmail } from "../services/emailService.js";

const requestLoginCode = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) throw HttpError(404, "User not found");

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 хв

  await LoginCode.create({ email, code, expiresAt });

  await sendEmail(email, "Your login code", `Your login code is: ${code}`);

  res.json({ message: "Verification code sent to your email" });
};

export default {
  requestLoginCode: ctrlWrapper(requestLoginCode),
};
