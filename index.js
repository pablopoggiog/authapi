import express from "express";
import mongoose from "mongoose";

const app = express();

const dbURI = "mongodb://localhost/authentication";

app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (err) => console.error(err));

db.once("open", () => console.log("DB started successfully"));

app.listen(2400, () => console.log("Server started: 2400"));
