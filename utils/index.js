const {status: statusCode} = require('../constants/status');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
    response : (res, status = statusCode.OK, message = "", data = {}) => {
        return res.status(status).json({
          success: true,
          message: message,
          data: data,
        });
      },
      generateAuth : (payload,timeout=config.get('JWT_OPTIONS').EXPIRE_IN)=>{
        return jwt.sign(
            {
                _id: payload._id
            },
            config.get('JWT_OPTIONS').SECRET_KEY,
            {expiresIn: timeout}
        );
      }
}


