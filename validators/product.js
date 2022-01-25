const { check, param } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreateProduct = [
  // Example: title, description
  check("title")
    .exists()
    .isString()
    .withMessage("Title should be text")
    .not()
    .isEmpty()
    .withMessage("Title is Required")
    .isLength({ max: 32 })
    .withMessage("Title must be contain maxium 32 characters"),

  check("description")
    .exists()
    .isString()
    .withMessage("Description should be text")
    .not()
    .isEmpty()
    .withMessage("Description is Required")
    .isLength({ max: 2000 })
    .withMessage("Description must contain maxium 2000 characters"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdateProduct = [
  // body: title, description
  // param: slug

  param("slug").isLowercase().withMessage("Slug should be pas in lowercase"),

  check("title")
    .exists()
    .isString()
    .withMessage("Title should be text")
    .not()
    .isEmpty()
    .withMessage("Title is Required")
    .isLength({ max: 32 })
    .withMessage("Title must be contain maxium 32 characters"),

  check("description")
    .exists()
    .isString()
    .withMessage("Description should be text")
    .not()
    .isEmpty()
    .withMessage("Description is Required")
    .isLength({ max: 2000 })
    .withMessage("Description must contain maxium 2000 characters"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreateProduct, validateUpdateProduct };
