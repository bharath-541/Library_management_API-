# Library Management API

A RESTful API for managing library operations including book inventory and book issuance tracking.

## Features

- **Book Management**: Create, read, update, and delete books
- **Issue Book Management**: Track book issuance and returns
- **MongoDB Integration**: Persistent data storage
- **RESTful Architecture**: Clean and organized API endpoints

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Installation

1. Clone the repository:

```bash
git clone https://github.com/bharath-541/Library_management_API-.git
cd Library_management_API-
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Books

#### Get All Books

```
GET /books/
```

#### Get Book by ID

```
GET /books/:id
```

#### Create a New Book

```
POST /books/
```

**Request Body:**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedYear": 1925,
  "price": 15.99,
  "quantity": 10
}
```

#### Update a Book

```
PUT /books/:id
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2024,
  "price": 19.99,
  "quantity": 5
}
```

#### Delete a Book

```
DELETE /books/:id
```

### Issue Books

#### Issue a Book

```
POST /issueBooks/
```

**Request Body:**

```json
{
  "bookId": "book_id_here",
  "bookName": "Book Name",
  "studentName": "Student Name",
  "issueDate": "2024-12-01",
  "returnDate": "2024-12-15"
}
```

#### Return a Book

```
PUT /issueBooks/
```

**Request Body:**

```json
{
  "issueBookId": "issue_book_id_here"
}
```

### Health Check

```
GET /health
```

## Project Structure

```
Library_management_Api/
├── src/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── Bookcontroller.js  # Book operations logic
│   │   └── issueBookController.js # Issue book operations
│   ├── models/
│   │   ├── Book.js            # Book schema
│   │   ├── Issueebook.js      # Issue book schema
│   │   └── Users.js           # User schema
│   └── routes/
│       ├── BookRouter.js      # Book routes
│       └── issueBookRouter.js # Issue book routes
├── server.js                  # Entry point
├── package.json
└── README.md
```

## Deployment

This API is deployed on Render at:

```
https://library-management-api-aqg8.onrender.com
```

## Response Format

### Success Response

```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "message": "Error description"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Contributing

Feel free to submit issues and pull requests.

## License

ISC

## Author

Bharath
