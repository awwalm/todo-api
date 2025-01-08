# Todo API Documentation

## Overview

The Todo API is a RESTful service built with Express.js and MySQL, implementing a robust MVC architecture. This API provides comprehensive functionality for managing todo items with professional-grade features including error handling, input validation, and search capabilities.

## Table of Contents

1. [Technical Architecture](#technical-architecture)
2. [Getting Started](#getting-started)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Security](#security)
8. [Deployment](#deployment)
9. [Development](#development)
10. [Testing](#testing)
11. [Monitoring](#monitoring)
12. [Contributing](#contributing)

## Technical Architecture

The application follows the Model-View-Controller (MVC) pattern:

```
src/
├── config/
│   ├── database.js    # Database configuration and initialization
│   └── schema.js      # Database schema definitions
├── controllers/
│   └── TodoController.js  # Request handling logic
├── models/
│   └── Todo.js           # Data access and business logic
├── routes/
│   └── todoRoutes.js     # Route definitions
├── tests/
│   └── todo.test.js      # Integration tests
├── app.js                # Application setup
└── server.js             # Server initialization
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- MySQL (v8.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-api.git
cd todo-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=todos_db
```

4. Start the server:
```bash
npm start
```

## Database Schema

### todos Table

| Column      | Type         | Constraints           |
|-------------|--------------|----------------------|
| id          | VARCHAR(36)  | PRIMARY KEY          |
| title       | VARCHAR(255) | NOT NULL             |
| description | TEXT         | NULL                 |
| completed   | BOOLEAN      | DEFAULT false        |
| createdAt   | DATETIME     | NOT NULL             |

Indexes:
- `idx_title` on `title`
- `idx_completed` on `completed`

## API Endpoints

### Create Todo

**POST** `/todos`

Creates a new todo item.

Request Body:
```json
{
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation"
}
```

Response: `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "completed": false,
  "createdAt": "2024-01-08T12:00:00Z"
}
```

### List All Todos

**GET** `/todos`

Retrieves all todo items.

Query Parameters:
- `search` (optional): Filter todos by title


Response: `200 OK`
```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Complete documentation",
      "description": "Write comprehensive API documentation",
      "completed": false,
      "createdAt": "2024-01-08T12:00:00Z"
    }
  ]
}
```

### Get Todo by ID

**GET** `/todos/:id`

Retrieves a specific todo item.

Response: `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Complete documentation",
  "description": "Write comprehensive API documentation",
  "completed": false,
  "createdAt": "2024-01-08T12:00:00Z"
}
```

### Update Todo

**PUT** `/todos/:id`

Updates an existing todo item.

Request Body:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

Response: `200 OK`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2024-01-08T12:00:00Z"
}
```

### Delete Todo

**DELETE** `/todos/:id`

Deletes a todo item.

Response: `204 No Content`

## Error Handling

The API uses standard HTTP status codes and returns consistent error objects:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": {
      "field": "title",
      "constraint": "required"
    }
  }
}
```

Common Status Codes:
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Security

The API implements several security measures:

1. Input Validation
2. SQL Injection Protection
3. DBMS Rate Limiting
4. CORS Configuration

## Deployment

### Render Deployment Steps

See detailed deployment instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

### Environment Variables for Production

Required variables:
```
PORT=3000
DB_HOST=production-db-host
DB_USER=production-db-user
DB_PASSWORD=production-db-password
DB_NAME=todos_db
NODE_ENV=production
```

## Development

### Code Style

The project follows the Airbnb JavaScript Style Guide. Run linting:
```bash
npm run lint
```

### Running Tests

Execute the test suite:
```bash
npm test
```

Test coverage report:
```bash
npm run test:coverage
```

## Monitoring

### Health Check Endpoint

**GET** `/health`

Response: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2024-01-08T12:00:00Z",
  "version": "1.0.0",
  "database": "connected"
}
```

### Logging

The application uses structured logging with the following levels:
- ERROR: System errors
- WARN: Important warnings
- INFO: General information
- DEBUG: Debug information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

### Commit Message Format

```
type(scope): subject

body

footer
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance

## License

This project is licensed under the GNU GPL v3.0 - see the [LICENSE](LICENSE) file for details.

## Contact

For support or queries, contact:
- Email: <_TBA_>
- GitHub Issues: [Create an issue](https://github.com/yourusername/todo-api/issues)

## Version History

- 1.0.0 (2024-01-08)
  - Initial release
  - Basic CRUD operations
  - Search functionality
  - Automated testing
  - Documentation
