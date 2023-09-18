// middleware/users.js

const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, resp, next) => {
    // username min length 3
    if (!req.body.Email || req.body.Email.length < 10) {
      return resp.status(400).send({
        message: 'Please enter a username with min. 3 chars',
      });
    }
    // password min 6 chars
    if (!req.body.Password || req.body.Password.length < 6) {
      return resp.status(400).send({
        message: 'Please enter a password with min. 6 chars',
      });
    }
    // password (repeat) must match
    if (
      !req.body.Password ||
      req.body.Password != req.body.Password
    ) {
      return resp.status(400).send({
        message: 'Both passwords must match',
      });
    }
    next();
  }
};