const HTTPException = require('../../utils/exception');
const models = require('../../Models');
const { messages } = require('../../constants/response');
const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = {
    signUp: async (body) => {
        try {
            const isExist = await models.userModel.findOne({ $or: [{ email: body.email, isDeleted: false }, { phone: body.phone, isDeleted: false }] });
            if (isExist) {
                //here it is checked if any of the email and phone is already registered with any other user
                if (isExist.email == body.email) throw new HTTPException(messages.Auth.EMAIL_ALREADY_ASSOCIATED);
                if (isExist.phone == body.phone) throw new HTTPException(messages.Auth.PHONE_ALREADY_ASSOCIATED);
            }
            body.password = await bcrypt.hash(body.password, 10);//hashing the password 
            const newUser = await models.userModel.create(body);//finally creating the the user data in user collection
            console.log(newUser)
            return newUser;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    login: async (body) => {
        try {
            const { email, phone, countryCode, password } = body;
            let user;
            if (email) {
                user = await models.userModel.findOne({ email: email, isDeleted: false });
                //checking if the provided mail exist or not 
            }
            //checking if the provided phone number exist or not
            else user = await models.userModel.findOne({ phone: phone, isDeleted });

            if (!(await bcrypt.compare(password, user.password))) throw new HTTPException(messages.Auth.INVALID_CREDENTIALS);
            //checking whether the password is valid
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    createAdvertisement: async (body, decode) => {
        try {
            const { start, end } = body;
            const startTime = start.split(':');
            const endTime = end.split(':');
            let responseData;

            if (start != null && start != "" && endTime[0] != null && end != "") {
                if (startTime[0] == endTime[0] && startTime[1] == endTime[1]) //both starting time and end time can't be equal
                {
                    throw new HTTPException(messages.Auth.INVALID_REQ);
                }
                responseData = await models.advertisement.create(body);
            }
            else throw new HTTPException(messages.Auth.INVALID_REQ);
            return responseData;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}