const HTTPException = require('../../utils/exception');
const models = require('../../Models');
const { messages } = require('../../constants/response');
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: async (body) => {
        try {
            console.log("body",body);
            const isExist = await models.userModel.findOne({ $or: [{ email: body.email, isDeleted: false }, { phone: body.phone, isDeleted: false }] });
            if(isExist){
                if (isExist.email == body.email) throw new HTTPException(messages.Auth.EMAIL_ALREADY_ASSOCIATED);
                if (isExist.phone == body.phone) throw new HTTPException(messages.Auth.PHONE_ALREADY_ASSOCIATED);
            }
            body.password = await bcrypt.hash(body.password, 10);
            const newUser = await models.userModel.create(body);
            console.log(newUser)
            return newUser;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}