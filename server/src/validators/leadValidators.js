import { body } from "express-validator";

export const createLeadRules = [
  body("division")
    .isString()
    .trim(),
  body("product").isString().trim().notEmpty(),
  body("productCategory").isString().trim().notEmpty(),
  body("customerName")
    .isString()
    .trim(),
  body("customerPhone")
    .isString()
    .trim()
    .matches(/^[0-9+\-()\s]{7,20}$/)
    .withMessage("Enter a valid phone number"),
  body("email").isEmail().withMessage("Valid email required"),
  body("location")
    .isString()
    .trim(),
  body("productDescription")
    .isString()
    .trim(),
  body("remark1").optional().isString().trim(),
  body("remark2").optional().isString().trim(),
];
