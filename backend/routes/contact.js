const express = require("express");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const contactLimiter = require("../middleware/rateLimiter");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "submissions.json");

// Ensure submissions file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const validators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name is too long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[\d\s+()-]{7,20}$/)
    .withMessage("Please enter a valid phone number"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

router.post("/", contactLimiter, validators, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }

  const { name, email, phone, message } = req.body;

  const submission = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    existing.push(submission);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));

    return res
      .status(201)
      .json({ message: "Submission received successfully." });
  } catch (err) {
    console.error("Failed to save submission:", err);
    return res
      .status(500)
      .json({ message: "Failed to save submission. Please try again." });
  }
});

// Dev-only: view stored submissions
router.get("/", (req, res) => {
  const existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(existing);
});

module.exports = router;
