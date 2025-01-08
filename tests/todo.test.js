// tests/todo.test.js
const app = require('../src/app');
const http = require('http');

async function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      ...options
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  let todoId;

  // Test CREATE
  console.log('Testing CREATE todo');
  const createResult = await request({
    path: '/todos',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }, {
    title: 'Test Todo',
    description: 'Test Description'
  });
  console.assert(createResult.statusCode === 201, 'Create should return 201');
  todoId = createResult.body.id;

  // Test GET ALL
  console.log('Testing GET ALL todos');
  const getAllResult = await request({
    path: '/todos',
    method: 'GET'
  });
  console.assert(getAllResult.statusCode === 200, 'Get all should return 200');
  console.assert(Array.isArray(getAllResult.body), 'Get all should return array');

  // Test GET by ID
  console.log('Testing GET todo by ID');
  const getResult = await request({
    path: `/todos/${todoId}`,
    method: 'GET'
  });
  console.assert(getResult.statusCode === 200, 'Get should return 200');
  console.assert(getResult.body.id === todoId, 'Get should return correct todo');

  // Test UPDATE
  console.log('Testing UPDATE todo');
  const updateResult = await request({
    path: `/todos/${todoId}`,
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  }, {
    title: 'Updated Todo',
    description: 'Updated Description',
    completed: true
  });
  console.assert(updateResult.statusCode === 200, 'Update should return 200');
  console.assert(updateResult.body.title === 'Updated Todo', 'Update should modify todo');

  // Test DELETE
  console.log('Testing DELETE todo');
  const deleteResult = await request({
    path: `/todos/${todoId}`,
    method: 'DELETE'
  });
  console.assert(deleteResult.statusCode === 204, 'Delete should return 204');

  console.log('All tests completed!');
  process.exit(0);
}

if (require.main === module) {
  runTests();
}