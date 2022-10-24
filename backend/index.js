import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/user.model.js";
import Todo from "./models/todo.model.js";

import jwt from "jsonwebtoken";

import escapeStringRegexp from "escape-string-regexp";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const URI = process.env.MONGODB_URL;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(URI, connectionParams)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
        },
        "secret123"
      );
      return res.json({
        status: 200,
        user: token,
        email: user.email,
        name: user.name,
      });
    } else {
      return res.json({ status: 404, user: false });
    }
  } catch (err) {}
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.json({ status: "Ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/addTodos", async (req, res) => {
  // console.log(req.body);
  try {
    const todo = await Todo.create({
      task: req.body.task,
      createdBy: req.body.createdBy,
    });
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.get("/api/getTodos/:createdBy", async (req, res) => {
  try {
    // console.log("createdby", req.params.createdBy);
    const todos = await Todo.find({ createdBy: req.params.createdBy });
    console.log(todos);
    return res.status(200).json([...todos]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.put("/api/updateTodo/:id", async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { task: req.body.task, createdBy: req.body.createdBy }
    );
    const todo = await Todo.findById(req.params.id);
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.patch("/api/toogleStatus/:id", async (req, res) => {
  try {
    const todoRef = await Todo.findById(req.params.id);

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id },
      { completed: !todoRef.completed }
    );
    await todo.save();
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.delete("/api/deleteTodos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

app.get("/api/searchTodo/search", async (req, res) => {
  try {
    const text = req.query.searchQuery;
    const userName = req.query.user;

    console.log(text, userName);
    const $regex = escapeStringRegexp(text);

    const todos = await Todo.find({
      task: { $regex },
      createdBy: userName,
    });
    console.log(todos);
    res.status(200).json([...todos]);
  } catch (error) {
    return res.status(404).json(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server Started on 5000");
});
