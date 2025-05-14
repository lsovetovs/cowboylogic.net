import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { id_token } = req.body;

  if (!id_token) {
    throw HttpError(400, "No id_token provided");
  }

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (err) {
    throw HttpError(401, "Invalid Google token");
  }

  const payload = ticket.getPayload();
  const { email, name } = payload;

  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({
      name,
      email,
      password: "google-auth", // або null, якщо nullable
      role: "user",
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
