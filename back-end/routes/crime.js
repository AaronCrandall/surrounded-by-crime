import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    // let collection = await db.collection("records");
    // let results = await collection.find({}).toArray();
    res.status(200).send();
});

// Retrieve all blogs
router.get("/all-blogs", async (req, res) => {
  let collection = await db.collection("blogs");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Register new user
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

//Login in a user
router.post("/login-user", async (req, res) => {
  try {
    let loginInfo = req.body;
    let collection = await db.collection("users");
    let result = await collection.findOne({email: loginInfo.email});
    if (loginInfo.password === result.password) {
      req.session.user = result._id;
      req.session.username = result.firstName;
      req.session.save();
      res.status(200).send();
    }
    else {
      res.status(403).send("Incorrect login info");
    }
  } catch {
    res.status(500).send("Error uploading user datat");
  }
});


// Upload a new blog
router.post("/new-blog", async (req, res) => {
  try {
    let newBlog = req.body;
    let collection = await db.collection("blogs");
    let result = await collection.insertOne(newBlog);
    res.send(result).status(200);
  } catch {
    res.status(500).send("Error uploading blog data");
  }
});

export default router;
