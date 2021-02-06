import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const tokenSecret = "my-secret";

router.get("/login", (req, res) => {});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      const newUser = User({ email, password: hash });
      try {
        const user = await newUser.save();
        res.status(200).json({ token: generateToken(user) });
      } catch (e) {
        res.status.json(error);
      }
    }
  });
});

const generateToken = (user) =>
  jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });

export default router;
