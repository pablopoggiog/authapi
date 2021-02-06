import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";

const router = express.Router();

router.get("/login", (req, res) => {});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) res.status(500).json(error);
    else {
      const newUser = User({ email, password: hash });
      try {
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (e) {
        res.status.json(error);
      }
    }
  });
});

export default router;
