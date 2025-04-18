import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Order from "./Order.js";
import Book from "./Book.js";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Book.hasMany(OrderItem, { foreignKey: "bookId", onDelete: "CASCADE" });
OrderItem.belongsTo(Book, { foreignKey: "bookId" });

export default OrderItem;
