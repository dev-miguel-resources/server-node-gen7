const Product = require("../models/product");
const slugify = require("slugify");
const { GET_ASYNC, SET_ASYNC } = require("../redis/index");

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
    .exec();
  res.json(total); // 2
};

exports.listAll = async (req, res) => {
  let products = await Product.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .exec();
  res.json(products);
};

// soft-delete
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product deleted failed");
  }
};

// strong delete
exports.remove2 = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product delete failed");
  }
};

// read normal
/*exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, status: "Active" })
    .exec();
  res.json(product);
};*/

// read with redis
exports.read = async (req, res) => {
  try {
    const reply = await GET_ASYNC(req.params.slug);
    if (reply) {
      console.log("using cached data");
      return res.send(JSON.parse(reply));
    }

    const product = await Product.findOne({
      slug: req.params.slug,
      status: "Active",
    })
      .populate("category")
      .exec();

    if (!product) {
      return res.status(404).json({ msg: "The product do not exist." });
    }

    const saveResult = await SET_ASYNC(
      req.params.slug,
      JSON.stringify(product),
      "EX",
      60
    );

    console.log("saved data:", saveResult);
    res.json(product);
  } catch (err) {
    res.send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----->", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// list pagination with redis
exports.list = async (req, res) => {
  console.table(req.body);
  try {
    //createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page | 1;
    const perPage = 3; // 3

    // Search Data in Redis
    const reply = await GET_ASYNC(req.originalUrl);
    // const reply = await GET_ASYNC("products");
    console.log("using cached data");

    // if exists
    if (reply) return res.send(JSON.parse(reply));

    const products = await Product.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    if (!products)
      res.status(404).send("Not Found products with status active");

    const saveResult = await SET_ASYNC(
      req.originalUrl,
      JSON.stringify(products),
      "EX",
      60
    );

    console.log("saved data:", saveResult);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

