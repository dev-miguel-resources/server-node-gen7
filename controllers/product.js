const Product = require("../models/product");
const slugify = require("slugify");

// exports middlewares: lógica de negocio
exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({ status: "Active" })
    .estimatedDocumentCount()
    .exec(); // 2
  res.json(total);
};

exports.listAll = async (req, res) => {
  let products = await Product.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .exec();
  res.json(products);
};
