import { body } from "express-validator";

export const createLeadRules = [
  body("division")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Division is required"),
  body("product").isString().trim().notEmpty(),
  body("productCategory").isString().trim().notEmpty(),
  body("customerName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Customer name is required"),
  body("customerPhone")
    .isString()
    .trim()
    .matches(/^[0-9+\-()\s]{7,20}$/)
    .withMessage("Enter a valid phone number"),
  body("email").isEmail().withMessage("Valid email required"),
  body("location")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Location is required"),
  body("productDescription")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),
  body("remark1").optional().isString().trim(),
  body("remark2").optional().isString().trim(),
];
