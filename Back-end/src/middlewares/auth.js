const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).send('Token requerido');
    }  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Token inválido');
      }       
      next();
    });
  };

module.exports = verifyToken;