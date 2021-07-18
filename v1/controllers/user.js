const service = require('../services/index');
const validations = require('../validations/user')
const utils = require('../../utils');
const HTTPException = require('../../utils/exception');
const services = require('../services/user');
const { status } = require('../../constants/status');
const { messages } = require('../../constants/response');
const { response } = require('../../utils');
const socket = require('../../utils/sockets');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            validations.signUp(req.body);
            const newUser = await services.signUp(req.body);
            const auth = utils.generateAuth(newUser);
            return await utils.response(res, status.CREATED, messages.Auth.ADDED_SUCCESSFULLY, { userData: newUser, auth: auth });
        }
        catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            validations.Login(req.body);
            const responseData = await services.login(req.body);
            const auth = utils.generateAuth(responseData);
            return await utils.response(res, status.OK, messages.Auth.SUCCESS, { data: responseData, auth: auth });
        }
        catch (error) {
            next(error);
        }
    },
    createAdvertisement: async (req, res, next) => {
        try {
            validations.advertisement(req.body);
            const responseData = await services.createAdvertisement(req.body, req.user, req.file);
            socket.socketData(responseData);
            return await utils.response(res, status.OK, messages.Auth.SUCCESS, responseData);
        }
        catch (error) {
            next(error);
        }
    }
}