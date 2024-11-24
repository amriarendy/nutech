import { Sequelize } from "sequelize";
import db from "../config/Mysql.js";
import { DateTime } from "../utils/libs/TimeFormat.js";

const getAllTransaction = async () => {
  const query = "SELECT * FROM transactions";
  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};

const getWhereTransaction = async (param) => {
  const query =
    "SELECT * FROM transactions WHERE balance_id = :balance_id ORDER BY created_on DESC";
  try {
    const result = await db.query(query, {
      replacements: { balance_id: param }, // Safe way to inject dynamic values
      type: Sequelize.QueryTypes.SELECT,
    });
    return result;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

const insertTransaction = async (transaction) => {
  const query = `
    INSERT INTO transactions (
      invoice_number,
      service_code,
      service_name,
      transaction_type,
      total_amount,
      created_on,
      balance_id,
      createdAt,
      updatedAt
    ) 
    VALUES (
      :invoice_number,
      :service_code,
      :service_name,
      :transaction_type,
      :total_amount,
      :created_on,
      :balance_id,
      :createdAt,
      :updatedAt
    );
  `;

  if (!transaction.balance_id) {
    transaction.balance_id = null;
  }

  try {
    const result = await db.query(query, {
      type: Sequelize.QueryTypes.INSERT,
      replacements: {
        invoice_number: transaction.invoice_number,
        service_code: transaction.service_code,
        service_name: transaction.service_name,
        transaction_type: transaction.transaction_type,
        total_amount: transaction.total_amount,
        created_on: transaction.created_on,
        balance_id: transaction.balance_id,
        createdAt: DateTime(),
        updatedAt: DateTime(),
      },
    });
    return result;
  } catch (error) {
    console.error("Error inserting transaction:", error);
    throw error;
  }
};

export { getAllTransaction, getWhereTransaction, insertTransaction };
