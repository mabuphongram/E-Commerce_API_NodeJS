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
const drop = async (req, res, next) => {
    let dbTag = await DB.findById(req.params.id);
    if (dbTag) {
      await DB.findByIdAndDelete(dbTag._id);
      Helper.fMsg(res, "Tag deleted");
    } else {
      next(new Error("No Tag with that id"));
    }
  };
  const get = async (req, res, next) => {
    let dbTag = await DB.findById(req.params.id);
    if (dbTag) {
      Helper.fMsg(res, "Single Tag", dbTag);
    } else {
      next(new Error("No Tag with that id"));
    }
  };
  const put = async (req,res,next)=>{
    let dbTag = await DB.findById(req.params.id)
    if(dbTag) {
      await DB.findByIdAndUpdate(dbTag._id,req.body)
      let result = await DB.findById(dbTag._id)
      Helper.fMsg(res,'Updated child cat',result)
    } else {
     next(new Error('No child category with that ID'))
    }
    }
module.exports = {
    add,
    all,
    drop,
    get,
    put
}