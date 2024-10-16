import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.post("/", async (req, res) => {
    try {
      let newUser = req.body;
      let collection = await db.collection("users");
      let result = await collection.insertOne(newUser);
      res.send(result).status(200);
    } catch {
      res.status(500).send("Error uploading user datat");
    }
});

router.post("/login-user", async (req, res) => {
  try {
    let loginInfo = req.body;
    let collection = await db.collection("users");
    let result = await collection.findOne({email: loginInfo.email});
    if (loginInfo.password === result.password) {
      res.send().status(200);
    }
    else {
      res.status(403).send("Incorrect login info");
    }
  } catch {
    res.status(500).send("Error uploading user datat");
  }
});

export default router;
