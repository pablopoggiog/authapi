import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRoute } from "./routes/index.js";

dotenv.config();

const app = express();

const dbURI = "mongodb://localhost/authentication";

app.use(express.json());
app.use("/api/auth", authRoute);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("DB started successfully"));

app.listen(2400, () => console.log("Server started: 2400"));
