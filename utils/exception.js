const { status: statusCode } = require('../constants/status');

module.exports = class HTTPException extends Error {
    constructor(message, status = statusCode.BAD_REQUEST) {
        super();
        this.message = message;
        this.status = status;
    }
}