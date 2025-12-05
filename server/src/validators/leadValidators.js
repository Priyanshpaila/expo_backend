import { body } from "express-validator";

export const createLeadRules = [
  body("division").isString().trim().optional(),
  body("product").isString().trim(),
  body("productCategory").isString().trim(),
  body("customerName").isString().trim().optional(),
  body("customerPhone")
    .isString()
    .trim()
    .matches(/^[0-9+\-()\s]{7,20}$/)
    .withMessage("Enter a valid phone number"),
  body("email").isEmail().withMessage("Valid email required"),
  body("location").isString().trim().optional(),
  body("productDescription").isString().trim().optional(),
  body("areaofInterest").optional().isString().trim(),
  body("firmName").optional().isString().trim(),

  body("feedback").optional().isString().trim(),
  body("remark").optional().isString().trim(),
];
