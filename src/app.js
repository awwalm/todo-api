require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabaseConnection } = require("./config/database");
const Todo = require("./models/Todo.js");
const { TodoController } = require('./controllers/TodoController.js')
const todoRoutes = require("./routes/todoRoutes");

async function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  try {
    // Initialize database and get pool
    const pool = await initializeDatabaseConnection();

    // Initialize models, controllers, and routes
    const todoModel = new Todo(pool);
    const todoController = new TodoController(todoModel);
    app.use("/todos", todoRoutes(todoController));

    // Health check endpoint
    app.get("/health", (req, res) => {
      res.json({ status: "healthy" });
    });

    return app;
  } catch (error) {
    console.error("Failed to create application:", error);
    throw error;
  }
}

module.exports = createApp;
