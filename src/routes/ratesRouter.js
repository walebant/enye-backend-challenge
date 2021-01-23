const express = require('express');
const ratesController = require('../controllers/rates');

const router = express.Router();

router.get('/', ratesController);

module.exports = router;
