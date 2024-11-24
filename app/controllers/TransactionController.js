import jwt from "jsonwebtoken";
import { DateTime } from "../utils/libs/TimeFormat.js";
import generateNumber from "../utils/libs/GenerateNumber.js";
import { getAllService, getWhereService } from "../models/ServiceModel.js";
import {
  getAllTransaction,
  getWhereTransaction,
  insertTransaction,
} from "../models/TransactionModel.js";
import {
  getAllBalance,
  getWhereBalance,
  updateBalance,
} from "../models/BalanceModel.js";
import { getWhereUser } from "../models/UserModel.js";

export const balance = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;
    const response = await getAllBalance(email);
    res.status(200).json({
      code: 200,
      status: true,
      message: "success",
      data: {
        balance: response[0].balance,
      },
    });
  } catch (error) {
    console.error(error.message);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.sendStatus(403);
    }
    res.sendStatus(500);
  }
};

export const topup = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      code: 401,
      status: false,
      message: "Authorization token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;

    const topupAmount = req.body.top_up_amount;
    const invoice_number = generateNumber(1, 100);
    const transaction_type = "TOPUP";
    const description = "Top Up Balance";
    const total_amount = topupAmount;
    const dateTransaction = DateTime();

    if (!topupAmount || topupAmount <= 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Invalid top-up amount",
      });
    }
    const getBalance = await getWhereBalance(email);

    if (!getBalance) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Balance not found",
      });
    }

    const newBalance = (getBalance[0].balance || 0) + parseFloat(topupAmount);

    await updateBalance(newBalance, email);

    const transaction = {
      invoice_number,
      service_code: "TOPUP",
      service_name: "Top Up",
      transaction_type,
      description,
      total_amount,
      created_on: dateTransaction,
      balance_id: getBalance[0].id,
    };

    await insertTransaction(transaction);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Topup successfully",
      data: {
        balance: newBalance,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: error.message,
    });
  }
};

export const transaction = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;

    const service_code = req.body.service_code;

    const getService = await getWhereService(service_code);

    if (!getService) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Service not found",
      });
    }

    const getBalance = await getWhereBalance(email);
    if (!getBalance) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Balance not found",
      });
    }

    const servicePrice = getService[0].service_tarif;
    if (getBalance[0].balance < servicePrice) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Your balance is not enough",
      });
    }

    const transaction = {
      invoice_number: `INV${generateNumber(1, 100)}`,
      service_code: service_code,
      service_name: getService[0].service_name,
      transaction_type: "PAYMENT",
      total_amount: servicePrice,
      created_on: DateTime(),
      balance_id: getBalance[0].id,
    };

    const transactionData = await insertTransaction(transaction);

    const newBalance = (getBalance[0].balance || 0) - parseFloat(servicePrice);

    await updateBalance(newBalance, email);

    res.status(201).json({
      code: 201,
      status: true,
      message: "Success",
      data: {
        invoice_number: transaction.invoice_number,
        service_code: transaction.service_code,
        service_name: transaction.service_name,
        transaction_type: transaction.transaction_type,
        total_amount: transaction.total_amount,
        created_on: transaction.created_on,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: error.message,
    });
  }
};

export const history = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;

    const user = await getWhereUser(email);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: [],
      });
    }

    const getBalanceId = await getWhereBalance(email);

    const transactions = await getWhereTransaction(getBalanceId[0].id);
    console.log("Transactions fetched:", transactions);

    const transactionData = transactions.map((transaction) => ({
      invoice_number: transaction.invoice_number,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total_amount,
      created_on: transaction.created_on,
    }));

    res.status(200).json({
      code: 200,
      status: true,
      message: "Success",
      data: {
        records: transactionData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      errors: error.message,
    });
  }
};
