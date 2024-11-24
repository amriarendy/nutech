import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const { DataTypes } = Sequelize;

const Auth = db.define(
  "users",
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    tokenRefresh: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Auth;

(async () => {
  await db.sync();
})();
