const express = require("express");
const router = express.Router();

// controller middlewares
const { create } = require("../controllers/category");

// routes-endpoints
router.post("/category", create);

module.exports = router;