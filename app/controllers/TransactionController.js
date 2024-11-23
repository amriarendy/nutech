import jwt from "jsonwebtoken";
import { DateTime } from "../utils/libs/TimeFormat.js";
import generateNumber from "../utils/libs/GenerateNumber.js";
import Service from "../models/ServiceModel.js";
import Transaction from "../models/TransactionModel.js";
import Balance from "../models/BalanceModel.js";
import User from "../models/UserModel.js";

export const balance = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;
    const response = await Balance.findOne({
      where: {
        user_id: email,
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "success",
      data: {
        balance: response.balance,
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
    const getBalance = await Balance.findOne({ where: { user_id: email } });

    if (!getBalance) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Balance not found",
      });
    }

    const newBalance = (getBalance.balance || 0) + parseFloat(topupAmount);

    await Balance.update(
      { balance: newBalance },
      { where: { user_id: email } }
    );

    await Transaction.create({
      invoice_number,
      service_code: "TOPUP",
      service_name: "Top Up",
      transaction_type,
      description,
      total_amount,
      created_on: dateTransaction,
      balance_id: getBalance.id,
    });

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
    const getService = await Service.findOne({
      where: { service_code: service_code },
    });

    if (!getService) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Service not found",
      });
    }

    const getBalance = await Balance.findOne({ where: { user_id: email } });
    if (!getBalance) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Balance not found",
      });
    }

    const servicePrice = getService.service_tarif;
    if (getBalance.balance < servicePrice) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Your balance is not enough",
      });
    }

    const transactionData = await Transaction.create({
      invoice_number: `INV${generateNumber(1, 100)}`,
      service_code: service_code,
      service_name: getService.service_name,
      transaction_type: "PAYMENT",
      total_amount: servicePrice,
      dateTransaction: DateTime(),
      balance_id: getBalance.id,
    });

    const newBalance = (getBalance.balance || 0) - parseFloat(servicePrice);

    await Balance.update(
      { balance: newBalance },
      { where: { user_id: email } }
    );

    res.status(201).json({
      code: 201,
      status: true,
      message: "Success",
      data: {
        invoice_number: transactionData.invoice_number,
        service_code: transactionData.service_code,
        service_name: transactionData.service_name,
        transaction_type: transactionData.transaction_type,
        total_amount: transactionData.total_amount,
        created_on: DateTime(),
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

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: [],
      });
    }

    const getBalanceId = await Balance.findOne({
      where: { user_id: email },
    });

    const transactions = await Transaction.findAll({
      where: { balance_id: getBalanceId.id },
      order: [["created_on", "DESC"]],
    });

    if (transactions.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No transactions found",
        data: [],
      });
    }

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
