import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Auth middleware: Received token:', token); 

  if (!token) {
    console.log('Auth middleware: No token provided');
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware: Token verified successfully', decoded); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth middleware: Token verification failed:', error); 
    return res.status(401).send({ error: 'Invalid token' });
  }
};

export default auth;