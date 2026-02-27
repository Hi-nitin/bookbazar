const { body, validationResult } = require("express-validator");

exports.createBookValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Book name is required")
    .isLength({ min: 3 })
    .withMessage("Book name must be at least 3 characters"),

  body("about")
    .trim()
    .notEmpty()
    .withMessage("About book is required")
    .isLength({ min: 10 })
    .withMessage("About must be at least 10 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters"),
];