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

// Get a specific blog
router.get("/blog/:id", async (req, res) => {
let collection = await db.collection("blogs");
let blogId = {_id: new ObjectId(req.params.id)};
let result = await collection.findOne(blogId);

if (!result) {
  res.send("Blog not found").status(404);
}
else {
  res.send(result).status(200);
}
});

// Register new user
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;
    let collection = await db.collection("users");
    let result = await collection.findOne({email: loginInfo.email});
    if (loginInfo.password === result.password) {
      req.session.user = result._id;
      req.session.username = result.firstName;
      console.log(req.session);
      req.session.save();
      res.send("Login successful").status(200);
    }
    else {
      res.status(403).send("Incorrect login info");
    }
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

//Upload a new comment
router.patch("/new-comment", async (req, res) => {
try {
  let blogId = {_id: new ObjectId(req.body.objectID)};
  let newComments = {
    $set: {
      comments: req.body.comments
    }
  }
  let collection = await db.collection("blogs");
  let result = await collection.updateOne(blogId, newComments);
  res.send(result).status(200);
} catch(err) {
  console.error(err);
  res.status(500).send("Error updating comments");
}
});

export default router;