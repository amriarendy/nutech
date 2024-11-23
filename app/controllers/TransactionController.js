import Transaction from "../models/TransactionModel.js";
import Balance from "../models/BalanceModel.js";
import jwt from "jsonwebtoken";
import { DateTime } from "../utils/libs/TimeFormat.js";
import generateNumber from "../utils/libs/GenerateNumber.js";
import Service from "../models/ServiceModel.js";

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
        message: "Saldo Anda tidak cukup",
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
    console.log(transactionData);

    res.status(200).json({
      code: 201,
      status: true,
      message: "Success",
      data: {
        invoice_number: transactionData.invoice_number,
        service_code: transactionData.service_code,
        service_name: transactionData.service_name,
        transaction_type: transactionData.transaction_type,
        total_amount: transactionData.total_amount,
        created_on: transactionData.dateTransaction,
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
  //
};
