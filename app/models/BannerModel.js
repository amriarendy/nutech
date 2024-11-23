import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const { DataTypes } = Sequelize;

const Auth = db.define(
  "banners",
  {
    banner_name: DataTypes.STRING,
    banner_image: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Auth;

(async () => {
  await db.sync();
})();
