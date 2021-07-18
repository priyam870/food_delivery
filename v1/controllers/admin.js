const service = require('../services/index');
const validations = require('../validations/admin')
const utils = require('../../utils');
const HTTPException = require('../../utils/exception');
const services = require('../services/admin');
const { status } = require('../../constants/status');
const { messages } = require('../../constants/response');
const { models } = require('mongoose');
const socket = require('../../utils/sockets');

module.exports = {
    register: async (req, res, next) => {
        try {
            validations.register(req.body);
            const responseData = await service.adminServices.signUp(req.body);
            const auth = await utils.generateAuth(responseData);
            return utils.response(res, status.OK, messages.Auth.SUCCESS, { admin_data: responseData, auth: auth });
        }
        catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            validations.Login(req.body);
            const responseData = await service.adminServices.login(req.body);
            const auth = await utils.generateAuth(responseData);
            return utils.response(res, status.OK, messages.Auth.SUCCESS, { admin_data: responseData, auth: auth });
        }
        catch (error) {
            next(error);
        }
    },
    approve: async (req, res, next) => {
        try {
            if (!req.body.isApproved || !req.body.advertisementId) throw new HTTPException(messages.Auth.PARAMETER_MISSING);
            const responseData = await service.adminServices.approve(req.body, req.user);
            socket.socketData(responseData);
            return utils.response(res, status.OK, messages.Auth.SUCCESS, responseData);
        }
        catch (error) {
            next(error);
        }
    },
    getAdvertisements: async (req, res, next) => {
        try {
            const responseData = await service.adminServices.getAdvertisements(req.user);
            return utils.response(res, status.OK, messages.Auth.SUCCESS, responseData);
        }
        catch (error) {
            next(error);
        }
    }
}