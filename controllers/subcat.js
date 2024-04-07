const DB = require("../models/subcat");
const Helper = require("../utils/helper");
const CatDB = require("../models/category");

const add = async (req, res, next) => {
  let dbSubCat = await DB.findOne({ name: req.body.name });
  if (dbSubCat) {
    next(new Error("Category is already existed"));
  } else {
    let dbCat = await CatDB.findById(req.body.catId);
    if (dbCat) {
      let result = await new DB(req.body).save();
      await CatDB.findByIdAndUpdate(dbCat._id, {
        $push: { subcats: result._id },
      });
      Helper.fMsg(res, "sub category saved", result);
    } else {
      next(new Error("No category with that id"));
    }
  }
};
const get = async (req,res,next)=>{
    let dbSubCat = await DB.findById(req.params.id)
    if(dbSubCat){
        Helper.fMsg(res,'Single category',dbSubCat)
    } else {
        next(new Error('No sub category with that id'))
    }

};
const all = async (req, res, next) => {
  let result = await DB.find().populate('childcats')
  Helper.fMsg(res, "All sub categories", result);
};

const drop = async (req,res,next)=>{
let dbSubCat = await DB.findById(req.params.id)
if(dbSubCat){
await CatDB.findByIdAndUpdate(dbSubCat.catId,{$pull:{subcats:dbSubCat._id}})
await DB.findByIdAndDelete(dbSubCat._id)
Helper.fMsg(res,'Sub Category deleted')
} else {
    next(new Error('No sub category with that ID'))
}
};

module.exports = {
  all,
  add,
  drop,
  get
};
