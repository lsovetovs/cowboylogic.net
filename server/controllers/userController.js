import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  user.role = role;
  await user.save();

  res.json({ message: "User role updated", user });
};


const getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "email", "role", "createdAt"],
    order: [["createdAt", "DESC"]],
  });

  res.json(users);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await user.destroy();
  res.json({ message: "User deleted", id });
};

export default {
  getAllUsers: ctrlWrapper(getAllUsers),
  updateUserRole: ctrlWrapper(updateUserRole),
  deleteUser: ctrlWrapper(deleteUser),
};
