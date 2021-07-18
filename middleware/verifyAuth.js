const utils = require("../utils");
const HttpException = require("../utils/exception");
const { status } = require("../constants/status");
const ObjectId = require("mongoose").Types.ObjectId;
const { messages } = require("../constants/response");

/**
 * Auth Middleware
 */
module.exports.verifyAuth = (Model) => {
  return async function (req, res, next) {
    try {
      if (req.user && req.user.guestMode) {
        next();
      } else if (req.headers.auth) {
        const accessToken = req.headers["auth"];
        const decodeData = utils.verifyAuth(accessToken);
        const userData = await Model.findOne({ _id: decodeData._id, isDeleted: false }).lean().exec();
        if (userData) {
          req.user = userData;
          next();
        } else throw new HttpException(messages.Auth.USER_NOT_FOUND, status.BAD_REQUEST);
      } else throw messages.Auth.NO_AUTH;
    } catch (error) {
      next(error);
    }
  };
};
