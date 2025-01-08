const express = require('express');
const { TodoController } = require('../controllers/TodoController');


/**
 * This routing function separates the logic between the 
 * {@link TodoController}, by binding specific 
 * methods to the relevant endpoints.
 * 
 * @param {TodoController} todoController 
 * @returns : {@link express.Router}
 */
function todoRoutes(todoController) {
  const router = express.Router();

  router.post('/', todoController.create);
  router.get('/', todoController.getAll);
  router.get('/:id', todoController.getById);
  router.put('/:id', todoController.update);
  router.delete('/:id', todoController.delete);

  return router;
}

module.exports = todoRoutes;