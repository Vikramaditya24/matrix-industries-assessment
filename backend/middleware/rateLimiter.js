const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per window
  message: {
    message: "Too many submissions from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = contactLimiter;