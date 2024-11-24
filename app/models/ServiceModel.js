import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const getAllService = async () => {
  const query =
    "SELECT service_code, service_name, service_icon, service_tarif FROM services";
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

const getWhereService = async (param) => {
  const query = `SELECT service_code, service_name, service_icon, service_tarif FROM services WHERE service_code = :service_code`;
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { service_code: param },
    });
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export { getAllService, getWhereService };
