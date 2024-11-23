import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const { DataTypes } = Sequelize;

const Auth = db.define(
  "transactions",
  {
    invoice_number: DataTypes.STRING,
    service_code: DataTypes.STRING,
    service_name: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    total_amount: DataTypes.STRING,
    created_on: DataTypes.STRING,
    balance_id: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Auth;

(async () => {
  await db.sync();
})();
