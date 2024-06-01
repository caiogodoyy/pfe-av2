const express = require("express");

const login = require("./login");
const register = require("./register");

const router = express.Router();

router.use(login);
router.use(register);

module.exports = router;
