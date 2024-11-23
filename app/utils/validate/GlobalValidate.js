import { Required, ExtSizeFile } from "./Validate.js";

const validateProfileUpdate = async (req, res, next) => {
  const fields = ["first_name", "last_name"];

  const required = new Required(fields).validate(req.body);

  // result error
  const errors = [...required.errors];

  if (errors.length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};

const validatePhotoUpdate = async (req, res, next) => {
  const fields = ["profile_image"];

  const required = new Required(fields).validate(req.files);
  const extAllowed = new ExtSizeFile("profile_image", 1000000, [
    ".png",
    ".jpg",
    ".jpeg",
  ]).validate(req.files);

  // result error
  const errors = [...extAllowed.errors];

  if (errors.length > 0) {
    return res.status(400).json({
      errors,
    });
  }

  next();
};

export { validateProfileUpdate, validatePhotoUpdate };
