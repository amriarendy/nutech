import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";

const getAllBalance = async (param) => {
  const query = `SELECT id, balance, user_id FROM balance WHERE user_id = :email`;
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

const getWhereBalance = async (param) => {
  const query = `SELECT id, balance, user_id FROM balance WHERE user_id = :email`;
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

const insertBalance = async (balance, email) => {
  const query = `INSERT INTO balance (balance, user_id) VALUES (:balance, :email)`;

  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.INSERT,
      replacements: { balance, email: email },
    });
    return result;
  } catch (error) {
    console.error("Error inserting balance:", error);
    throw error;
  }
};

const updateBalance = async (balance, param) => {
  const query = `UPDATE balance SET balance = :balance WHERE user_id = :email`;
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.UPDATE,
      replacements: { balance, email: param },
    });
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export { getAllBalance, getWhereBalance, insertBalance, updateBalance };
