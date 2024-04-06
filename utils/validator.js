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

  validateRole: (role)=>{
    return async(req,res,next)=>{
      let findRole = req.user.roles.find(ro=> ro.name == role)
      if(findRole){
        next()
      } else {
        next(new Error("You don't have this permission"))
      }
    }
  },
  hasAnyRole :(roles)=>{
    return async(req,res,next)=>{
      let bol = false
      for (let i =0;i<roles.length;i++){
        let hasRole = req.user.roles.find(ro=> ro.name === roles[i])
        console.log(hasRole)
        if(hasRole){
          bol = true
          break
        }
      }
      if(bol) next()
      else next(new Error("You don't have enough role"))
    }
  },
  hasAnyPermit :(permits)=>{
    return async(req,res,next)=>{
      let bol = false
      for (let i =0;i<permits.length;i++){
        let hasPermit = req.user.permits.find(ro=> ro.name === permits[i])
        if(hasPermit){
          bol = true
          break
        }
      }
      if(bol) next()
      else next(new Error("You don't have enough permit"))
    }
  }
};
