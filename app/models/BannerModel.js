import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const getAllBanner = async () => {
  const query = "SELECT banner_name, banner_image, description FROM banners";
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};

export { getAllBanner };
