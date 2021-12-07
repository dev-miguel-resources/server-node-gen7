const express = require("express");
const router = express.Router();

// controller middlewares
const { create, productsCount, listAll, remove, remove2, read, update } = require("../controllers/product");

// routes-endpoints product
router.post("/product", create);

/**
 * @swagger
 * /products/total:
 *   get:
 *     tags:
 *       - name: "Product"
 *     summary: "All products Active"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/products/total", productsCount);


router.get("/products/:count", listAll); // products/50
router.patch("/product/:slug", remove); // soft-delete
router.delete("/product/:slug", remove2); // no soft-delete
router.get("/product/:slug", read);
router.put("/product/:slug", update);

module.exports = router;

