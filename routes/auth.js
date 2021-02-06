import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const router = express.Router();

router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ error: "no user with that email found" });
    else {
      bcrypt.compare(password, user.password, (error, match) =>
        error
          ? res.status(500).json(error)
          : match
          ? res.status(200).json({ token: generateToken(user) })
          : res.status(403).json({ error: "passwords do not match" })
      );
    }
  } catch (e) {
    res.status(500).json(error);
  }
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) res.status(409).json({ error: "the user already exists" });

  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      try {
        const newUser = await User({ email, password: hash });
        const user = newUser.save();
        res.status(200).json({ token: generateToken(user) });
      } catch (e) {
        res.status.json(error);
      }
    }
  });
});

const generateToken = (user) =>
  jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: "24h" });

export default router;
