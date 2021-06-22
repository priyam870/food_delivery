const sgMail = require('@sendgrid/mail');
const config = require('config');

sgMail.setApiKey(config.get('SENDGRID').API_KEY);

module.exports.sendMail = async(payload,subject='Auto generated email')=>{
    try{
        const msg  = {
            to: payload.email,
            from: config.get('SENDGRID').FROM_EMAIL,
            subject: subject
        }
        const result = await sgMail.send(msg);
        return result;
    }
    catch(error){
        console.log('error:>>>>>>',error);
        return error;
    }
}