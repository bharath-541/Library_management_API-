const express = require('express');
require('dotenv').config();
require('./src/config/db');
const bookRouter = require('./src/routes/BookRouter');
const issueBookRouter = require('./src/routes/issueBookRouter');
const userRouter = require('./src/routes/UserRouter');
const { limiter, securityHeaders } = require('./src/middleware/security');

const app = express();

app.use(express.json());

app.use(securityHeaders);
app.use(limiter);

const requestlogger = (req, res, next) => {
  console.log(`${req.method} ${req.path} ${new Date().toISOString()}`);
  next();
};

app.get('/', (request, response) => {
  response.status(200).json({
    message: 'Welcome to LIbrary managemnet API',
  });
});

app.get('/health', (request, response) => {
  response.status(200).json({
    status: 'OK',
    message: 'Server is Running Successfully',
  });
});

app.use(requestlogger);
app.use('/books/', bookRouter);
app.use('/issueBooks/', issueBookRouter);
app.use('/users/', userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
