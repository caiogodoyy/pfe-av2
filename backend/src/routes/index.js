const express = require("express");

const login = require("./login");
const register = require("./register");
const service = require("./service");

const router = express.Router();

router.use(login);
router.use(register);
router.use(service);

module.exports = router;
