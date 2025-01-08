import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Todo = require("../models/Todo.js");

/**
 * This controller isolates the intricacies encapsulating
 * the actual methods wrapped/tied to the HTTP methods.
 * An instance of this class must be created with a valid
 * instance of {@link Todo}.
 */
export class TodoController {
  /**@param {Todo} todoModel  */
  constructor(todoModel) {
    if (!todoModel) throw new Error('TodoModel is required');
    this.todoModel = todoModel;

    // Bind methods to ensure correct 'this' context
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }
      const todo = await this.todoModel.create({ title, description });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to create todo" });
    }
  }

  async getAll(req, res) {
    try {
      const { search } = req.query;
      const todos = await this.todoModel.findAll(search);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  }

  async getById(req, res) {
    try {
      const todo = await this.todoModel.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todo" });
    }
  }

  async update(req, res) {
    try {
      const updated = await this.todoModel.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Todo not found" });
      }
      const todo = await this.todoModel.findById(req.params.id);
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to update todo" });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await this.todoModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete todo" });
    }
  }
}

