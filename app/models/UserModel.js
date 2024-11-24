import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const getCredentials = async () => {
  const query = "SELECT email password tokenRefresh FROM users";
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};

const getAllUser = async () => {
  const query =
    "SELECT email password first_name last_name profile_image tokenRefresh FROM users";
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};

const getWhereUser = async (param) => {
  const query = `SELECT email, first_name, last_name, profile_image, tokenRefresh FROM users WHERE email = :email`;
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { email: param },
    });
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const updateUser = async (first_name, last_name, param) => {
  const query = `UPDATE users SET first_name = :first_name, last_name = :last_name WHERE email = :email`;
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.UPDATE, // Use UPDATE query type
      replacements: { first_name, last_name, email: param },
    });
    return result; // Returning the result of the update operation
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const updateImageUser = async (profile_image, param) => {
  const query = `UPDATE users SET profile_image = :profile_image WHERE email = :email`;
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.UPDATE, // Use UPDATE query type
      replacements: { profile_image, email: param },
    });
    return result; // Returning the result of the update operation
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export {
  getAllUser,
  getWhereUser,
  updateUser,
  updateImageUser,
  getCredentials,
};
