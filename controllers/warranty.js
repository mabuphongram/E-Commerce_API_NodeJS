const DB = require("../models/warranty");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "all Warranties", result);
};

const add = async (req, res, next) => {
  let dbWarranty = await DB.findOne({ name: req.body.name });
  if (dbWarranty) {
    next(new Error("warranty already exist"));
  } else {
    req.body.remark = req.body.remark.split(',')
    let dbWarranty = await new DB(req.body).save();
    Helper.fMsg(res, "New warranty added!", dbWarranty);
  }
};

const drop = async (req, res, next) => {
  let dbWarranty = await DB.findById(req.params.id);
  if (dbWarranty) {
    await DB.findByIdAndDelete(dbWarranty._id);
    Helper.fMsg(res, "Warranty deleted");
  } else {
    next(new Error("No warranty with that id"));
  }
};
const get = async (req, res, next) => {
  let dbWarranty = await DB.findById(req.params.id);
  if (dbWarranty) {
    Helper.fMsg(res, "Single Warranty", dbWarranty);
  } else {
    next(new Error("No warranty with that id"));
  }
};
const put = async (req,res,next)=>{
let dbWarranty = await DB.findById(req.params.id)
if(dbWarranty) {
  await DB.findByIdAndUpdate(dbWarranty._id,req.body)
  let result = await DB.findById(dbWarranty._id)
  Helper.fMsg(res,'Updated warranty cat',result)
} else {
 next(new Error('No child warranty with that ID'))
}
}

module.exports = {
  all,
  add,
  drop,
  get,
  put
};
