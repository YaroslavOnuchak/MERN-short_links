const { Router } = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = Router();

//  /api/auth/register
router.post(
  "/register",
  [
    check("email", "doesnt correct email").isEmail(),
    check("password", "min len  Symbol").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // console.log("req.body :>> ", req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "dont corect date in register",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "email is exist " });
      }
      const hashedPasword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPasword });

      await user.save();

      res.status(201).json({ message: "user created" });
    } catch (error) {
      res.status(500).json({ message: "something is going wrong" });
    }
  }
);
//  /api/auth/login
router.post(
  "/login",
  [
    check("email", "enter corect  mail").normalizeEmail().isEmail(),
    check("password", "enter pasword").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "dont corect date in enter",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "user wasnt found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "wrong pass" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "something is going wrong" });
    }
  }
);

module.exports = router;
