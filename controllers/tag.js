const DB = require("../models/tag");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "all tags", result);
};

const add = async (req, res, next) => {
  let dbTag = await DB.findOne({ name: req.body.name });
  if (dbTag) {
    next(new Error("Tag already exist"));
  } else {
    let dbTag = await new DB(req.body).save();
    Helper.fMsg(res, "Child Category added!", dbTag);
  }
};

module.exports = {
    add,
    all
}