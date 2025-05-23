import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const LoginCode = sequelize.define("LoginCode", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default LoginCode;
