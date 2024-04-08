const DB = require("../models/delivery");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "all deliveries", result);
};

const add = async (req, res, next) => {
  let dbDelivery = await DB.findOne({ name: req.body.name });
  if (dbDelivery) {
    next(new Error("Child Catetory already exist"));
  } else {
    req.body.remark = req.body.remark.split(',')
    let dbDelivery = await new DB(req.body).save();
    Helper.fMsg(res, "New Delivery added!", dbDelivery);
  }
};

const drop = async (req, res, next) => {
  let dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    await DB.findByIdAndDelete(dbDelivery._id);
    Helper.fMsg(res, "Delivery deleted");
  } else {
    next(new Error("No delivery with that id"));
  }
};
const get = async (req, res, next) => {
  let dbDelivery = await DB.findById(req.params.id);
  if (dbDelivery) {
    Helper.fMsg(res, "Single Delivery", dbDelivery);
  } else {
    next(new Error("No delivery with that id"));
  }
};
const put = async (req,res,next)=>{
let dbDelivery = await DB.findById(req.params.id)
if(dbDelivery) {
  await DB.findByIdAndUpdate(dbDelivery._id,req.body)
  let result = await DB.findById(dbDelivery._id)
  Helper.fMsg(res,'Updated child cat',result)
} else {
 next(new Error('No child category with that ID'))
}
}

module.exports = {
  all,
  add,
  drop,
  get,
  put
};
