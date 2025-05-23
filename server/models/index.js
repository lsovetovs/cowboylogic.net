import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import { sequelize } from "../config/db.js";
import LoginCode from "./LoginCode.js"; // 👈 явно імпортуємо

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    import(path.join(__dirname, file)).then((module) => {
      const model = module.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
  });

db.LoginCode = LoginCode; // 👈 додаємо явно
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
