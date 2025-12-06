const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
  try {
    const { token } = request.headers;
    if (!token) {
      return response.status(401).json({ message: 'Unauthorized' });
    }
    const secret = process.env.JWT_SECRET || 'Cutie';
    console.log('Using secret:', secret);
    const decodedToken = jwt.verify(token, secret);
    if (!decodedToken) {
      return response.status(401).json({ message: 'Token is invalid' });
    }
    request.user = decodedToken;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    response.status(500).json({ message: error.message });
  }
};

module.exports = authMiddleware;
