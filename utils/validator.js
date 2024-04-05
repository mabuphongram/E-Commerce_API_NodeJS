const jwt = require("jsonwebtoken");
const Helper = require("./helper");
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let result = schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(" ")[1];
        let decodedData = jwt.decode(token, process.env.SECRET_KEY);

        let user = await Helper.get(decodedData._id);
        if (user) {
          req.user = user;
          next();
        } else {
          next(new Error("That data does not exist in Redis"));
        }
      } else {
        next(new Error("Tokenization error"));
      }
    };
  },
};
