const HTTPException = require('../../utils/exception');
const models = require('../../Models');
const { messages } = require('../../constants/response');
const bcrypt = require('bcryptjs');

module.exports = {
    signUp: async (body) => {
        try {
            const isExist = await models.adminModel.findOne({ $or: [{ email: body.email, isDeleted: false }, { phone: body.phone, isDeleted: false }] });
            if (isExist) {
                if (isExist.email == body.email) throw new HTTPException(messages.Auth.EMAIL_ALREADY_ASSOCIATED);
                if (isExist.phone == body.phone) throw new HTTPException(messages.Auth.PHONE_ALREADY_ASSOCIATED);
            }
            body.password = await bcrypt.hash(body.password, 10);
            const newAdmin = await models.adminModel.create(body);
            console.log(newAdmin)
            return newAdmin;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    login: async (body) => {
        try {
            const { email, phone, countryCode, password } = body;
            let admin;
            if (email) {
                admin = await models.adminModel.findOne({ email: email, isDeleted: false });
            }
            else admin = await models.adminModel.findOne({ phone: phone, isDeleted });
            if (!(await bcrypt.compare(password, admin.password))) {
                throw new HTTPException(messages.Auth.INVALID_CREDENTIALS);
            }
            return admin;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    approve: async (body, decode) => {
        try {
            const { isApproved, advertisementId } = body;
            const exist = await models.advertisement.findOne({ _id: advertisementId, isDeleted: false });
            if (exist.isApproved == true) {
                throw new Error('Advertisement already approved');
            }
            if (isApproved == true) {
                body.admin = decode._id;
                //above condtion will help in the case when admin rejects the advertisement because by default 
                //the value of isApproved key is false therefore it is only updated to true in case of admin approval
            }
            const responseData = await models.advertisement.findOneAndUpdate({ _id: advertisementId, isDeleted: false }, body, { new: true });
            return responseData;
        }
        catch (error) {
            throw new Error(error);
        }
    },
    getAdvertisements: async (decode) => {
        try {
            //fetching all the advertisements that have been approved by admin 

            const responseData = await models.advertisement.find({ admin: decode._id, isDeleted: false });
            //in the above query on admin Id and isDeleted keys are used in the query as only after the approval by 
            //admin  is the document updated with admin Id and isapproved = true
            return responseData;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}