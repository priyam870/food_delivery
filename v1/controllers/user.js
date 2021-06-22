const service = require('../services/index');
const validations = require('../../validations/user');
const utils = require('../../utils');
const HTTPException = require('../../utils/exception');
const services = require('../services/user');
const {status} = require('../../constants/status');
const { messages } = require('../../constants/response');

module.exports = {
    signUp : async(req, res,next)=>{
        try{
            console.log("req.body:>>>>>>>>>>>>>>",req.body);
            validations.signUp(req.body);
            const newUser = await services.signUp(req.body);
            const auth = utils.generateAuth(newUser);
            return await utils.response(res,status.CREATED,messages.Auth.ADDED_SUCCESSFULLY,{userData: newUser, auth: auth});
        }
        catch(error){
            console.log("error:>>>>>",error);
            next (error);
        }
    }
}