import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import User from "../models/UserModel.js";

export const profile = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;
    const response = await User.findOne({
      where: {
        email: email,
      },
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "Success",
      data: {
        email: response.email,
        first_name: response.first_name,
        last_name: response.last_name,
        profile_image: `${req.protocol}://${req.get("host")}/uploads/profile/${
          response.profile_image
        }`,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: "Internal Server Error",
      errors: error.message,
    });
  }
};

export const update = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const { email } = decoded;

  const { first_name, last_name } = req.body;
  try {
    await User.update(
      {
        first_name,
        last_name,
      },
      {
        where: { email: email },
      }
    );
    const updatedUser = await User.findOne({
      where: { email },
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "Success",
      data: {
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: `${req.protocol}://${req.get("host")}/uploads/profile/${
          updatedUser.profile_image
        }`,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: "Internal Server Error",
      errors: error.message,
    });
  }
};

export const uploadImage = async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Authorization token missing",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { email } = decoded;

    // Retrieve user based on email
    const getUser = await User.findOne({ where: { email: email } });
    if (!getUser) {
      return res
        .status(404)
        .json({ code: 404, status: false, message: "User not found" });
    }

    let fileName = getUser.profile_image;
    let imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/profile/${fileName}`;

    if (req.files && req.files.profile_image) {
      const file = req.files.profile_image;
      const ext = path.extname(file.name).toLowerCase();

      fileName = `${file.md5}${ext}`;

      const oldFilePath = `./public/uploads/profile/${getUser.profile_image}`;
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      try {
        await file.mv(`./public/uploads/profile/${fileName}`);
        imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/profile/${fileName}`;
      } catch (error) {
        return res.status(500).json({
          code: 500,
          status: false,
          message: "Internal Server Error",
          errors: error.message,
        });
      }
    }

    await User.update({ profile_image: fileName }, { where: { email: email } });

    const updatedUser = await User.findOne({ where: { email } });
    res.status(200).json({
      code: 200,
      status: true,
      message: "Profile image updated successfully",
      data: {
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: `${req.protocol}://${req.get("host")}/uploads/profile/${
          updatedUser.profile_image
        }`,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: "Internal Server Error",
      errors: error.message,
    });
  }
};
