const express = require("express");
const router = express.Router();

// controller middlewares


// routes-endpoints product
router.post("/product", create);
router.get("/products/total", productsCount);
router.get("/products/:count", listAll) // products/50
router.patch("/product/:slug", remove); // soft-delete
router.delete("/product/:slug", remove2); // no soft-delete
router.get("/product/:slug", read); 
router.put("/product/:slug", update);

module.exports = router;

