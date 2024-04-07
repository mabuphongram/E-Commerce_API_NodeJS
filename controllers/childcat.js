const DB = require("../models/childcat");
const SubCatDB = require("../models/subcat");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "all child cat", result);
};

const add = async (req, res, next) => {
  let dbChildCat = await DB.findOne({ name: req.body.name });
  if (dbChildCat) {
    next(new Error("Child Catetory already exist"));
  } else {
    let dbChildCat = await new DB(req.body).save();
    await SubCatDB.findByIdAndUpdate(dbChildCat.subcatId, {
      $push: { childcats: dbChildCat._id },
    });
    Helper.fMsg(res, "Child Category added!", dbChildCat);
  }
};

const drop = async (req, res, next) => {
  let dbChildCat = await DB.findById(req.params.id);
  if (dbChildCat) {
    await SubCatDB.findByIdAndUpdate(dbChildCat.subcatId, {
      $pull: { childcats: dbChildCat._id },
    });
    await DB.findByIdAndDelete(dbChildCat._id);
    Helper.fMsg(res, "Child category deleted");
  } else {
    next(new Error("No child category with that id"));
  }
};
const get = async (req, res, next) => {
  let dbChildCat = await DB.findById(req.params.id);
  if (dbChildCat) {
    Helper.fMsg(res, "Single child category", dbChildCat);
  } else {
    next(new Error("No category with that id"));
  }
};
const put = async (req,res,next)=>{
let dbChildCat = await DB.findById(req.params.id)
if(dbChildCat) {
  await DB.findByIdAndUpdate(dbChildCat._id,req.body)
  let result = await DB.findById(dbChildCat._id)
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
