import Auth from "../models/AuthModel.js";
import { insertBalance } from "../models/BalanceModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signIn = async (req, res) => {
  try {
    const user = await Auth.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match)
      return res.status(400).json({
        errors: [
          {
            field: "password",
            issue: "INCORECT",
            message: "Incorect password!",
          },
        ],
      });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const tokenAccess = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20000000s",
      }
    );
    const tokenRefresh = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Auth.update(
      { tokenRefresh: tokenRefresh },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("tokenRefresh", tokenRefresh, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ tokenAccess });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    const tokenRefresh = req.cookies.tokenRefresh;
    if (!tokenRefresh) return res.sendStatus(204);
    const user = await User.findAll({
      where: {
        tokenRefresh: tokenRefresh,
      },
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update(
      { tokenRefresh: null },
      {
        where: {
          id: userId,
        },
      }
    );
    res.clearCookie("tokenRefresh");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
};

export const register = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, salt);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const profile_image = "default.jpg";
  try {
    await Auth.create({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      profile_image: profile_image,
    });
    let balance = null;
    await insertBalance(balance, email);
    res
      .status(201)
      .json({ code: 201, status: true, message: "Account registered" });
  } catch (error) {
    console.log(error.message);
  }
};
