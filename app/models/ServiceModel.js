import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const { DataTypes } = Sequelize;

const Auth = db.define(
  "services",
  {
    service_code: DataTypes.STRING,
    service_name: DataTypes.STRING,
    service_icon: DataTypes.STRING,
    service_tarif: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Auth;

(async () => {
  await db.sync();
})();
