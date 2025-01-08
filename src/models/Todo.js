
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');


/**
 * This `Todo` model is a pseudo-ORM schematic that separates
 * verbose declaration of database fields from manual entry
 * by requiring only the minimum functional requirements as
 * method parameters. This is in accordance with the MVC pattern
 * (I guess we can skip the "V" since this is fully backend system for now).
 */
class Todo {
  constructor(pool) {
    /**@type mysql.Pool*/
    this.pool = pool;
  }

  async create({ title, description }) {
    const id = uuidv4();
    const todo = {
      id,
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    await this.pool.query(
      'INSERT INTO todos (id, title, description, completed, createdAt) VALUES (?, ?, ?, ?, ?)',
      [todo.id, todo.title, todo.description, todo.completed, todo.createdAt]
    );

    return todo;
  }

  async findAll(search = '') {
    const query = search 
      ? 'SELECT * FROM todos WHERE title LIKE ?' 
      : 'SELECT * FROM todos';
    const params = search ? [`%${search}%`] : [];
    const [rows] = await this.pool.query(query, params);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.pool.query('SELECT * FROM todos WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async update(id, updates) {
    const [result] = await this.pool.query(
      'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?',
      [updates.title, updates.description, updates.completed, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await this.pool.query('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Todo;