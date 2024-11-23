import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const { DataTypes } = Sequelize;

const Balance = db.define(
  "balance",
  {
    balance: DataTypes.STRING,
    user_id: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Balance;

(async () => {
  await db.sync();
})();
