const joi = require('joi');
const HTTPException = require('../../utils/exception');

function validateSchema(_data, _schema) {
  let options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };
  let { error } = _schema.validate(_data, options);
  if (error) {
    throw error.message;
  } else return false;
}

module.exports = {
  register: (data) => {
    const { password } = data;
    const whitespace = " ";
    if (password[0] == whitespace || password[password.lenght - 1] == whitespace)
      throw new HTTPException('whiteSpaces can be in between the password not at the starting or the end of it');
    let schema = joi.object({
      email: joi.string().trim().lowercase().required(),
      password: joi.string().min(6).required(),
      phone: joi.string().min(10).required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
      countryCode: joi.string().required(),
    });
    return validateSchema(data, schema);
  },

  Login: (data) => {
    if (data.email) {
      const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(6),
      });
      return validateSchema(data, schema);
    } else {
      const schema = joi.object({
        countryCode: joi.string().required(),
        phone: joi.string.required()().min(10),
        password: joi.string().required().min(6),
      });
      return validateSchema(data, schema);
    }
  }
}