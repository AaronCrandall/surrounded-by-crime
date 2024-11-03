import express from "express";
import db from "../db/connection.js";
import jwt from 'jsonwebtoken';
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

// Get a set of time filtered blogs
router.get("/blog-time-filter", async (req, res) => {
  let collection = await db.collection("blogs");

  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  const filter = {
    $and: [
      { time: { $gt: startTime }},
      { time: { $lt: endTime }},
      { date: { $gt: startDate }},
      { date: { $gt: startDate }}
    ]
  }

  const results = await collection.find(filter);
  if (results) {
    res.send(results).status(200);
  } else {
    res.send("Filtered data not found").status(403);
  }
})

// Register new user
router.post("/", async (req, res) => {
  try {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newUser);
    res.send(result).status(204);
  } catch {
    res.status(500).send("Error uploading user data");
  }
});

//Login in a user
router.post("/login-user", async (req, res) => {
try {
  let loginInfo = req.body;
  let collection = await db.collection("users");
  let result = await collection.findOne({email: loginInfo.email});
  if (loginInfo.password === result.password) {
    const jwtSecret = process.env.JWT_SECRET;
    let jwtData = {
      user: result._id,
      userFirst: result.firstName,
      userLast: result.lastName
    }
    const token = jwt.sign(jwtData, jwtSecret);

    res.status(200).json({message: "Login successful", token});
  }
  else {
    res.status(403).send("Incorrect login info");
  }
} catch {
  res.status(500).send("Error uploading user datat");
}
});

//Authenticate user
router.post("/auth-user", async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.headers['jwt-token']
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded) {
      return res.status(200).json({
        user: decoded.user,
        userFirst: decoded.userFirst,
        userLast: decoded.userLast
      });
    } else {
      return res.status(401).json({message: 'Error authenticating'});
    }
  } catch (error) {
    return res.status(401).json({message: 'Error'});
  }
})

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