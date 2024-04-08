const DB = require("../models/product");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  Helper.fMsg(res, "all products", result);
};

const add = async (req, res, next) => {
  let dbProduct = await DB.findOne({ name: req.body.name });
  if (dbProduct) {
    next(new Error("Product already exist"));
  } else {
    req.body.features = req.body.features.split(",");
    req.body.delivery = req.body.delivery.split(",");
    req.body.warranty = req.body.warranty.split(",");
    req.body.colors = req.body.colors.split(",");
    let dbProduct = await new DB(req.body).save();
    Helper.fMsg(res, "New product added!", dbProduct);
  }
};

const drop = async (req, res, next) => {
  let dbProduct = await DB.findById(req.params.id);
  if (dbProduct) {
    await DB.findByIdAndDelete(dbProduct._id);
    Helper.fMsg(res, "product deleted");
  } else {
    next(new Error("No product with that id"));
  }
};
const get = async (req, res, next) => {
  let dbProduct = await DB.findById(req.params.id);
  if (dbProduct) {
    Helper.fMsg(res, "Single product", dbProduct);
  } else {
    next(new Error("No product with that id"));
  }
};
const put = async (req, res, next) => {
  let dbProduct = await DB.findById(req.params.id);
  if (dbProduct) {
    await DB.findByIdAndUpdate(dbProduct._id, req.body);
    let result = await DB.findById(dbProduct._id);
    Helper.fMsg(res, "Updated product cat", result);
  } else {
    next(new Error("No product  with that ID"));
  }
};

const paginate = async (req, res, next) => {
  let page = Number(req.params.page);
  const limit = Number(process.env.PAGE_LIMIT);

  const reqPage = page == 1 ? 0 : page - 1;
  const skipCount = limit * reqPage

  let result = await DB.find().skip(skipCount).limit(limit)
  Helper.fMsg(res,`Paginated Page No : ${reqPage}`, result)
};

const productByCat = async (req,res,next)=>{
  let page = Number(req.params.page);
  const limit = Number(process.env.PAGE_LIMIT);

  const reqPage = page == 1 ? 0 : page - 1;
  const skipCount = limit * reqPage

  let result = await DB.find({cat:req.params.id}).skip(skipCount).limit(limit)
  Helper.fMsg(res,`Paginated Page No : ${reqPage}`, result)
}

const productByTag = async (req,res,next)=>{
  let page = Number(req.params.page);
  const limit = Number(process.env.PAGE_LIMIT);

  const reqPage = page == 1 ? 0 : page - 1;
  const skipCount = limit * reqPage

  let result = await DB.find({tag:req.params.id}).skip(skipCount).limit(limit)
  Helper.fMsg(res,`products by tag `, result)
}
module.exports = {
  all,
  add,
  drop,
  get,
  put,
  paginate,
  productByCat,
  productByTag
};
