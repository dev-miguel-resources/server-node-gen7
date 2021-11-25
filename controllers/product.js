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
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};


