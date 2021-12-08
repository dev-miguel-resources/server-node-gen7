const express = require("express");
const router = express.Router();

// controller middlewares
const { create, productsCount, listAll, remove, remove2, read, update } = require("../controllers/product");

// routes-endpoints product
// ROUTES - SWAGGER


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

/**
 * @swagger
 * /products/{count}:
 *   get:
 *     tags:
 *       - name: "Product"
 *     summary: "All products active by count"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "count product search"
 *         required: true
 *         type: "integer"
 *         format: "int64"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/products/:count", listAll); // products/50

router.patch("/product/:slug", remove); // soft-delete
router.delete("/product/:slug", remove2); // no soft-delete
router.get("/product/:slug", read);
router.put("/product/:slug", update);

module.exports = router;

// SCHEMAS - SWAGGER

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *       properties:
 *         title:
 *            type: string
 *            trim: true
 *            maxlength: 32
 *            text: true
 *         description:
 *            type: string
 *            maxlength: 2000
 *            text: true
 *         price:
 *            type: "integer"
 *            trim: true
 *            maxlength: 32
 */




