const express = require("express");
const router = express.Router();

// middlewares pre-process
const { authCheck, adminCheck } = require("../middlewares/auth");

// middlewares controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// routes - endpoints

// TO-DO SWAGGER SERVICE

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;

// TO-DO SCHEMAS - SWAGGER